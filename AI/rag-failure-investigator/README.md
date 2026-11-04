# RAG Failure & Hallucination Investigator

A RAG experimentation project that investigates retrieval failures, hallucinations, unsupported questions and conflicting information.

## Tech Stack
- Python
- ChromaDB
- Groq API (`openai/gpt-oss-20b`)
- all-MiniLM-L6-v2 embeddings

## Features
- 6 deliberately overlapping and conflicting documents.
- 8 test questions across four failure categories.
- Retrieval, context injection and LLM generation.
- Complete retrieval traces and generated answers.
- Failure analysis and retrieval improvement experiments.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file:

```env
GROQ_API_KEY=your_api_key
```

## Run

```bash
python src/indexing.py
python src/pipeline.py
```

For additional experiments:

```bash
python src/retest.py
python src/query_expansion.py
```

## Evaluation

See the `evaluation/` directory for test questions, execution traces, retest results and failure analysis.

The baseline investigation identified three failures involving retrieval ranking and generation. Follow-up experiments explored retrieval depth and query expansion.