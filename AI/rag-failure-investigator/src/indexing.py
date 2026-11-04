import chromadb

from chunking import load_documents

BASE_DIR = __import__("pathlib").Path(__file__).parent.parent

client = chromadb.PersistentClient(
    path=str(BASE_DIR / "chroma_db")
)

embedding_function = chromadb.utils.embedding_functions.DefaultEmbeddingFunction()


def build_index():
    documents = load_documents()

    collection = client.get_or_create_collection(
        name="atlasdesk",
        embedding_function=embedding_function,
        metadata={"hnsw:space": "cosine"}
    )

    existing_ids = collection.get()["ids"]

    if existing_ids:
        collection.delete(ids=existing_ids)

    collection.add(
        ids=[doc["id"] for doc in documents],
        documents=[doc["text"] for doc in documents],
        metadatas=[{"source": doc["source"]} for doc in documents]
    )

    print(f"Indexed {collection.count()} chunks from 6 documents.")


if __name__ == "__main__":
    build_index()
