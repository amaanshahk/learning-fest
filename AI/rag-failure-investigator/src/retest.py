import json
from pathlib import Path

from retrieval import retrieve_context
from generation import generate_answer

BASE_DIR = Path(__file__).parent.parent
QUESTIONS_FILE = BASE_DIR / "evaluation" / "questions.json"
RESULTS_FILE = BASE_DIR / "evaluation" / "retest_top8.json"

with open(QUESTIONS_FILE, encoding="utf-8") as file:
    questions = json.load(file)

results = []

for test in questions:
    if test["id"] not in ["Q1", "Q5", "Q6"]:
        continue

    contexts = retrieve_context(test["question"], top_k=8)
    answer = generate_answer(test["question"], contexts)

    results.append({
        "id": test["id"],
        "category": test["category"],
        "question": test["question"],
        "retrieved_contexts": contexts,
        "final_answer": answer
    })

    print(f"\n{'=' * 60}")
    print(f"{test['id']} — {test['question']}")

    for context in contexts:
        print(f"{context['source']} | {context['id']}")

    print("\nAnswer:")
    print(answer)

with open(RESULTS_FILE, "w", encoding="utf-8") as file:
    json.dump(results, file, indent=4)

print(f"\nRetest saved to {RESULTS_FILE}")
