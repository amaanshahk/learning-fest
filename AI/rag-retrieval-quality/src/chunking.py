from pathlib import Path
import re


DOCUMENT_DIR = Path(__file__).parent.parent / "data" / "documents"


def load_documents():
    documents = []

    for path in sorted(DOCUMENT_DIR.glob("*.md")):
        text = path.read_text(encoding="utf-8")

        sections = re.split(r"(?=^## )", text, flags=re.MULTILINE)

        for section in sections:
            section = section.strip()

            if not section or section.startswith("# "):
                continue

            lines = section.splitlines()
            section_id = lines[0].replace("## ", "").split(" — ")[0]
            title = lines[0].replace("## ", "")

            documents.append({
                "id": section_id,
                "text": section,
                "source": path.name,
                "section": title
            })

    return documents


def fixed_size_chunks(documents, chunk_size=180, overlap=40):
    chunks = []

    for document in documents:
        text = document["text"]
        start = 0

        while start < len(text):
            end = start + chunk_size
            chunk_text = text[start:end]

            chunks.append({
                "id": f"{document['id']}_{start}",
                "text": chunk_text,
                "source": document["source"],
                "section": document["section"],
                "parent_id": document["id"]
            })

            start += chunk_size - overlap

    return chunks


def paragraph_chunks(documents):
    chunks = []

    for document in documents:
        chunks.append({
            "id": document["id"],
            "text": document["text"],
            "source": document["source"],
            "section": document["section"],
            "parent_id": document["id"]
        })

    return chunks