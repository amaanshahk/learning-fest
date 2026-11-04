
import chromadb

from chunking import (
    load_documents,
    fixed_size_chunks,
    paragraph_chunks
)

client = chromadb.PersistentClient(
    path="./chroma_db"
)

embedding_function = chromadb.utils.embedding_functions.DefaultEmbeddingFunction()


def index_chunks(collection_name, chunks):
    collection = client.get_or_create_collection(
        name=collection_name,
        embedding_function=embedding_function,
        metadata={"hnsw:space": "cosine"}
    )

    if collection.count() > 0:
        collection.delete(
            ids=collection.get()["ids"]
        )

    collection.add(
        ids=[chunk["id"] for chunk in chunks],
        documents=[chunk["text"] for chunk in chunks],
        metadatas=[
            {
                "source": chunk["source"],
                "section": chunk["section"],
                "parent_id": chunk["parent_id"]
            }
            for chunk in chunks
        ]
    )

    print(f"{collection_name}: {collection.count()} chunks indexed.")


if __name__ == "__main__":
    documents = load_documents()

    fixed_chunks = fixed_size_chunks(documents)
    section_chunks = paragraph_chunks(documents)

    index_chunks("fixed_size", fixed_chunks)
    index_chunks("section_based", section_chunks)
