from pathlib import Path
import re

DOCUMENT_DIR = Path(__file__).parent.parent / "data" / "documents"


def load_documents():
    documents = []

    for path in sorted(DOCUMENT_DIR.glob("*.md")):
        text = path.read_text(encoding="utf-8")

        paragraphs = re.split(r"\n\s*\n", text.strip())

        for index, paragraph in enumerate(paragraphs):
            paragraph = paragraph.strip()

            if not paragraph or paragraph.startswith("# "):
                continue

            documents.append({
                "id": f"{path.stem}_{index}",
                "text": paragraph,
                "source": path.name
            })

    return documents
