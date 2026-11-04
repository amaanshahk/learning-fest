# RAG Retrieval Quality Analysis

## 1. Objective

Compare fixed-size chunking and section-based chunking in a RAG retrieval system using ChromaDB and the same embedding model.

## 2. Experimental Setup

- Documents: 4
- Total source sections: 29
- Fixed-size chunks: 65
- Section-based chunks: 29
- Embedding model: all-MiniLM-L6-v2
- Vector database: ChromaDB
- Distance metric: Cosine
- Evaluation questions: 6
- Retrieved results per question: Top 3

## 3. Evaluation Metric

Precision@3 measures the proportion of retrieved results that belong to the question's expected relevant sections.

Duplicate chunks belonging to the same relevant section are counted only once.

## 4. Results

| Question | Fixed-size | Section-based |
|---|---:|---:|
| Q1 | 0.6667 | 1.0000 |
| Q2 | 1.0000 | 1.0000 |
| Q3 | 0.6667 | 0.6667 |
| Q4 | 0.6667 | 1.0000 |
| Q5 | 0.3333 | 0.3333 |
| Q6 | 0.3333 | 0.3333 |
| **Average** | **0.6111** | **0.7222** |

## 5. Analysis

Section-based chunking achieved an average Precision@3 of 0.7222, outperforming fixed-size chunking at 0.6111.

Section-based chunking performed better on Q1 (PostgreSQL failure and recovery) and Q4 (order confirmation during service failures). It preserved complete section-level context and retrieved all three expected relevant sections for both questions.

Both strategies performed equally on Q2, Q3, Q5 and Q6.

Fixed-size chunking produced a lower score on Q1 and Q4, where relevant information was distributed across multiple sections. Splitting sections into smaller chunks may separate related context.

## 6. Conclusion

In this experiment, section-based chunking provided better retrieval quality than fixed-size chunking, achieving an improvement of 0.1111 in average Precision@3.

However, this result is based on a small dataset of four documents and six questions. More documents and evaluation questions would be needed to establish whether the advantage generalizes to larger RAG systems.
