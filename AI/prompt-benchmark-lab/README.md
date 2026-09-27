# Prompt Benchmark Lab

A prompt benchmarking experiment for LF 2026.

## Objective

This project compares three different prompt strategies for classifying customer support tickets using an LLM.

Each ticket is classified into:

* Category: billing, technical, account, or general
* Urgency: low, medium, or high
* Suggested action

The same 8 test cases and the same model were used for all three prompts.

## Prompt Strategies

### Prompt 1 - Basic

A minimal prompt containing only the core task requirements.

### Prompt 2 - Few-shot

The task prompt includes example inputs and outputs to demonstrate the expected classification approach.

### Prompt 3 - Instruction-heavy

A detailed prompt that explicitly defines the allowed categories, urgency levels, JSON structure, and restrictions against unsupported information.

## Test Cases

The benchmark contains 8 support tickets covering:

* Billing complaints
* Technical problems
* Account access
* Pricing questions
* Account security
* Website performance
* Unauthorized payments
* An ambiguous support request

## Evaluation

Each output was manually scored using four criteria:

* Correctness
* Format compliance
* Hallucination
* Consistency

Each criterion receives 0, 1, or 2 points, giving a maximum of 8 points per response.

There are 8 tickets and 3 prompts, resulting in 24 benchmark results.

## Results

| Prompt                       | Score | Percentage |
| ---------------------------- | ----: | ---------: |
| Prompt 1 - Basic             | 49/64 |     76.56% |
| Prompt 2 - Few-shot          | 59/64 |     92.19% |
| Prompt 3 - Instruction-heavy | 61/64 |     95.31% |

## Analysis

The basic prompt produced the lowest score. Although it could classify straightforward tickets, its responses frequently contained additional assumptions and unsupported details.

The few-shot prompt performed substantially better. The examples helped guide the model toward more consistent classifications and actions.

The instruction-heavy prompt achieved the highest score. Its explicit instructions about the allowed categories, urgency levels, JSON format, and avoiding unsupported information resulted in more structured and concise responses.

The ambiguous eighth ticket, `It doesn't work.`, demonstrated an important limitation. The few-shot prompt responded more cautiously by requesting additional information, while the instruction-heavy prompt maintained the required JSON format but still classified the ticket as technical with high urgency.

Overall, the benchmark shows that more explicit prompting and examples improved performance on this particular test set. The instruction-heavy prompt achieved the highest score, while the few-shot prompt also showed a significant improvement over the basic prompt.

## Files

| File                   | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `benchmark_program.py` | Runs the benchmark against all test cases and prompts            |
| `test_cases.json`      | Contains the 8 benchmark test cases                              |
| `prompts.json`         | Contains the three prompt strategies                             |
| `results.json`         | Contains the raw LLM responses                                   |
| `scores.json`          | Contains the manual evaluation scores                            |
| `scoring.md`           | Defines the scoring criteria and benchmark analysis              |
| `test_api.py`          | Tests the API connection                                         |
| `.gitignore`           | Prevents `.env` and other unnecessary files from being committed |

## Model

The benchmark was run using the Groq API with the `openai/gpt-oss-20b` model.

## Security

The API key is stored in a `.env` file and excluded from version control using `.gitignore`.
