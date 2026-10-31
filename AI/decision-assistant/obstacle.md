# Obstacles and Solutions

## 1. Loading the Dataset
**Obstacle:** The application needed to load laptop records from a separate JSON file.

**Solution:** Used Python's `json` module and `pathlib` to load `laptops.json` relative to the application file.

## 2. Filtering and Ranking
**Obstacle:** The system needed to identify laptops that satisfy multiple user requirements and rank the results.

**Solution:** Implemented deterministic Python functions:
- `filter_laptops()` filters by maximum price and minimum RAM.
- `score_laptops()` filters by minimum rating and battery life, then calculates the score using rating + battery hours.
- `recommend_laptops()` combines both operations.

## 3. Connecting the LLM to Python
**Obstacle:** The language model needed to interpret natural-language requests and invoke Python functions with structured arguments.

**Solution:** Used Groq's OpenAI-compatible API and function calling to connect the LLM with the Python recommendation function.

## 4. Handling Ambiguous Requests
**Obstacle:** Vague requests such as "I need a good laptop" do not provide enough information for a meaningful recommendation.

**Solution:** The assistant asks the user for missing requirements instead of assuming preferences.

## 5. Handling Impossible Requirements
**Obstacle:** Some combinations of requirements may not match any laptop in the dataset.

**Solution:** The Python function returns an empty result, and the assistant informs the user without inventing alternatives.

## 6. API Key Security
**Obstacle:** The API key must not be exposed in source code or uploaded to GitHub.

**Solution:** Stored the key in a `.env` file, loaded it using `python-dotenv`, and excluded `.env` and the virtual environment through `.gitignore`.
