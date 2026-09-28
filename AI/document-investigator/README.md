# Multi-Stage Document Investigator

A multi-stage LLM investigation pipeline that extracts factual claims from a messy document, detects contradictions between those claims, and produces a final evidence-based finding.

## Overview

This project demonstrates a three-stage LLM pipeline:

```text
Messy Document
      ↓
Stage 1: Fact Extraction
      ↓
Structured JSON
      ↓
Stage 2: Contradiction Detection
      ↓
Structured JSON
      ↓
Stage 3: Final Reasoning
      ↓
Investigation Finding
```

Each stage is handled by a separate LLM call. The raw document is only provided to the first stage. Later stages operate on the structured JSON produced by the previous stage.

## Stage 1 — Fact Extraction

The first stage reads `messy_document.txt` and extracts important factual claims.

The extraction focuses on:

* Project timeline
* Dates
* Staffing
* Budget
* Performance
* Security incidents
* Project status

The model is instructed not to resolve contradictions or decide which claim is correct.

Output:

```text
extraction.json
```

Temperature experiments:

```text
extraction_03.json
extraction_07.json
extraction_10.json
```

## Stage 2 — Contradiction Detection

The second stage receives only the extracted facts from Stage 1.

It compares the claims and identifies incompatible statements.

Each detected contradiction contains:

* Topic
* Claim A
* Claim B
* Description of the conflict

Output:

```text
contradictions.json
```

Temperature experiments:

```text
contradictions_03.json
contradictions_07.json
contradictions_10.json
```

The pipeline also includes handling for empty or invalid Stage 2 responses so that a failed model response does not immediately crash the entire pipeline.

## Stage 3 — Final Reasoning

The final stage receives only the detected contradictions.

It produces a cautious investigation finding containing:

* Conclusion
* Confirmed facts
* Disputed issues
* Evidence gaps

The model is explicitly instructed not to resolve contradictions by guessing and not to introduce information from the original document.

Output:

```text
final_reasoning.json
```

Temperature experiments:

```text
final_reasoning_03.json
final_reasoning_07.json
final_reasoning_10.json
```

## Temperature Testing

The pipeline was tested at multiple temperature settings:

* `0.3`
* `0.7`
* `1.0`

Separate Python files were created for the experiments:

```text
temperature_test_03.py
temperature_test_07.py
temperature_test_10.py
```

The intermediate JSON files were saved separately so that the results from different temperatures could be compared without overwriting previous runs.

The tests showed differences in extraction and contradiction detection. In particular, higher-temperature runs produced different sets of detected contradictions and, in some cases, additional reasoning that was not as tightly constrained as lower-temperature runs.

## Failure Analysis

Several incorrect or questionable outputs were identified during testing.

The detailed analysis is documented separately in:

```text
failure_analysis.md
```

The failures include cases involving:

* Treating changing measurements over time as contradictions
* Incorrect arithmetic reasoning about staffing
* Treating an approved budget and a projected final cost as contradictory
* Overly broad conclusions during final reasoning
* Missing or inconsistent contradictions between different temperature runs

These failures demonstrate why a multi-stage pipeline needs both structured intermediate outputs and careful prompt constraints.

## Project Files

| File                     | Purpose                                                                        |
| ------------------------ | ------------------------------------------------------------------------------ |
| `messy_document.txt`     | Source document containing repeated information and intentional contradictions |
| `pipeline.py`            | Main working three-stage pipeline                                              |
| `temperature_test_03.py` | Pipeline tested at temperature 0.3                                             |
| `temperature_test_07.py` | Pipeline tested at temperature 0.7                                             |
| `temperature_test_10.py` | Pipeline tested at temperature 1.0                                             |
| `extraction*.json`       | Fact extraction results                                                        |
| `contradictions*.json`   | Contradiction detection results                                                |
| `final_reasoning*.json`  | Final reasoning results                                                        |
| `failure_analysis.md`    | Analysis of incorrect/questionable outputs                                     |
| `.gitignore`             | Prevents environment files and virtual environments from being committed       |

## LLM Configuration

The pipeline uses the OpenAI-compatible API provided by Groq.

Model:

```text
openai/gpt-oss-20b
```

The API key is loaded from an environment variable:

```text
GROQ_API_KEY
```

The API key itself is not included in the repository.

## Running the Pipeline

Activate the virtual environment:

```bash
source venv/bin/activate
```

Run the main pipeline:

```bash
python3 pipeline.py
```

Run a temperature experiment:

```bash
python3 temperature_test_03.py
python3 temperature_test_07.py
python3 temperature_test_10.py
```

The resulting JSON files can be validated using:

```bash
python3 -m json.tool extraction_03.json > /dev/null
python3 -m json.tool contradictions_03.json > /dev/null
python3 -m json.tool final_reasoning_03.json > /dev/null
```

## Key Design Principle

The main design principle of this project is to separate extraction, contradiction detection, and reasoning into independent stages.

Instead of asking one LLM call to read the entire document and immediately produce a conclusion, each stage has a specific responsibility and passes structured JSON to the next stage.

This makes the investigation easier to trace, debug, and evaluate.
