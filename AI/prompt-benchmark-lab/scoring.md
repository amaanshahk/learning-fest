# Prompt Benchmark Scoring

Each response was manually evaluated using four criteria: correctness, format compliance, hallucination, and consistency.

Each criterion is scored from 0 to 2, giving a maximum of 8 points per response.

| Criterion             | 0                                                        | 1                                      | 2                                                   |
| --------------------- | -------------------------------------------------------- | -------------------------------------- | --------------------------------------------------- |
| **Correctness**       | Classification or suggested action is incorrect          | Partially correct                      | Classification and suggested action are appropriate |
| **Format compliance** | Does not follow the format requested by the prompt       | Minor formatting issue                 | Follows the format requested by the prompt          |
| **Hallucination**     | Contains significant invented or unsupported information | Contains minor unsupported information | Contains no unsupported information                 |
| **Consistency**       | Contradicts the expected treatment of similar cases      | Some inconsistency                     | Consistent with the task and similar cases          |

## Results

| Prompt                       | Score | Percentage |
| ---------------------------- | ----: | ---------: |
| Prompt 1 — Basic             | 49/64 |     76.56% |
| Prompt 2 — Few-shot          | 59/64 |     92.19% |
| Prompt 3 — Instruction-heavy | 61/64 |     95.31% |

## Analysis

The basic prompt performed the weakest overall, scoring 49 out of 64. Its responses were generally able to classify straightforward tickets, but they frequently included unsupported details and assumptions.

The few-shot prompt performed better, scoring 59 out of 64. Providing examples helped the model produce more consistent responses and reduced unsupported assumptions in several cases.

The instruction-heavy prompt scored 61 out of 64, giving it the highest overall score in this benchmark. Its explicit requirements about the allowed categories, urgency levels, JSON structure, and avoiding unsupported information helped produce concise and structured responses with fewer hallucinations.

The ambiguous eighth test case, "It doesn't work.", was particularly useful for comparison. The few-shot prompt handled the ambiguity more cautiously by asking for additional information. The instruction-heavy prompt followed the required JSON format correctly but still classified the ticket as technical with high urgency despite the limited information available.

Overall, the results show that adding examples and explicit instructions improved performance on this particular test set. The instruction-heavy prompt produced the highest score, while the few-shot prompt also showed a substantial improvement over the basic prompt.

These results apply only to the eight test cases used in this benchmark and the model used for the experiment.

