# RAG Retrieval Quality Lab

An experimental RAG project comparing fixed-size and section-based chunking strategies to evaluate retrieval quality using ChromaDB.

## Tech Stack
- Python
- ChromaDB
- all-MiniLM-L6-v2 embeddings

## Features
- 4 interconnected technical documents containing 29 sections.
- Fixed-size chunking (180 characters, 40-character overlap).
- Section-based chunking.
- Separate ChromaDB collections for both strategies.
- 6 evaluation questions with known relevant sections.
- Top-3 retrieval and Precision@3 scoring.
- Comparative results and analysis.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
python src/indexing.py
python src/evaluate.py
```

## Results

| Chunking Strategy | Average Precision@3 |
|---|---:|
| Fixed-size | 0.6111 |
| Section-based | 0.7222 |

Section-based chunking performed better in this experiment, with an improvement of 11.11 percentage points.

## Evaluation

See the `evaluation/` directory for test questions, detailed retrieval results, scoring and analysis.