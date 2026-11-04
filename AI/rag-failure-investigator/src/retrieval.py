import chromadb
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent

client = chromadb.PersistentClient(
    path=str(BASE_DIR / "chroma_db")
)

embedding_function = chromadb.utils.embedding_functions.DefaultEmbeddingFunction()

collection = client.get_collection(
    name="atlasdesk",
    embedding_function=embedding_function
)


def retrieve_context(question, top_k=5):
    results = collection.query(
        query_texts=[question],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )

    contexts = []

    for i in range(len(results["ids"][0])):
        contexts.append({
            "id": results["ids"][0][i],
            "source": results["metadatas"][0][i]["source"],
            "text": results["documents"][0][i],
            "distance": results["distances"][0][i]
        })

    return contexts
