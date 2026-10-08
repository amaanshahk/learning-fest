# Obstacle Log

## 1. Invalid Model Name

### Problem
The initial model name returned a 404 model-not-found error.

### Solution
Changed the model to `openai/gpt-oss-20b`, which worked correctly with the Groq OpenAI-compatible API.

---

## 2. JSON Evaluation Error

### Problem
The LLM occasionally returned a response that could not be parsed using `json.loads()`.

### Solution
Tested the evaluation response and ensured the model was instructed to return the required JSON structure.

---

## 3. Session State and Follow-up Questions

### Problem
Streamlit reruns the script after interactions, so interview questions and answers needed to persist between interactions.

### Solution
Used Streamlit session state to store questions, answers, evaluations, and the current question count.