import json
import csv
import chromadb
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
QUESTIONS_FILE = BASE_DIR / "evaluation" / "questions.json"
RESULTS_FILE = BASE_DIR / "evaluation" / "results.json"
SCORES_FILE = BASE_DIR / "evaluation" / "scores.csv"

client = chromadb.PersistentClient(path=str(BASE_DIR / "chroma_db"))

embedding_function = chromadb.utils.embedding_functions.DefaultEmbeddingFunction()

with open(QUESTIONS_FILE, encoding="utf-8") as file:
    questions = json.load(file)

results = []
scores = []

for collection_name in ["fixed_size", "section_based"]:
    collection = client.get_collection(
        name=collection_name,
        embedding_function=embedding_function
    )

    for question in questions:
        retrieved = collection.query(
            query_texts=[question["question"]],
            n_results=3
        )

        relevant_sections = set(question["relevant_sections"])
        relevant_parent_ids = set()
        retrieved_chunks = []

        for i in range(len(retrieved["ids"][0])):
            metadata = retrieved["metadatas"][0][i]
            parent_id = metadata["parent_id"]
            is_relevant = parent_id in relevant_sections

            if is_relevant:
                relevant_parent_ids.add(parent_id)

            retrieved_chunks.append({
                "rank": i + 1,
                "chunk_id": retrieved["ids"][0][i],
                "parent_id": parent_id,
                "source": metadata["source"],
                "section": metadata["section"],
                "distance": retrieved["distances"][0][i],
                "relevant": is_relevant,
                "text": retrieved["documents"][0][i]
            })

        relevant_count = len(relevant_parent_ids)
        precision = relevant_count / len(retrieved_chunks) if retrieved_chunks else 0

        results.append({
            "pipeline": collection_name,
            "question_id": question["id"],
            "question": question["question"],
            "relevant_sections": question["relevant_sections"],
            "retrieved": retrieved_chunks,
            "precision_at_3": round(precision, 4)
        })

        scores.append({
            "pipeline": collection_name,
            "question_id": question["id"],
            "relevant_retrieved": relevant_count,
            "retrieved_count": len(retrieved_chunks),
            "precision_at_3": round(precision, 4)
        })

with open(RESULTS_FILE, "w", encoding="utf-8") as file:
    json.dump(results, file, indent=4)

with open(SCORES_FILE, "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=scores[0].keys())
    writer.writeheader()
    writer.writerows(scores)

for pipeline in ["fixed_size", "section_based"]:
    pipeline_scores = [
        score["precision_at_3"]
        for score in scores
        if score["pipeline"] == pipeline
    ]
    average = sum(pipeline_scores) / len(pipeline_scores)
    print(f"{pipeline}: Average Precision@3 = {average:.4f}")

print(f"\nDetailed results saved to {RESULTS_FILE}")
print(f"Scores saved to {SCORES_FILE}")
