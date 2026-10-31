# AI Decision Assistant – Laptop Recommendations

## Overview

The Laptop Decision Assistant helps users choose a laptop based on their requirements. It uses a Large Language Model (LLM) to understand natural-language requests and Python functions to filter and rank laptops from a local JSON dataset.

The project separates objective dataset facts from AI-generated recommendations.

## Features

- Local dataset containing 10 laptop records.
- Natural-language input.
- LLM-powered interpretation of user requirements.
- Python function calling for deterministic filtering and ranking.
- Filtering by maximum price, minimum RAM, minimum rating, and minimum battery life.
- Ranking using the formula:

  `Score = Rating + Battery Hours`

- Handles ambiguous requests by asking for clarification.
- Handles impossible requirements without fabricating results.
- Separates dataset facts from AI recommendations.

## Technology Stack

- Python
- Groq API
- OpenAI Python SDK
- JSON
- python-dotenv

## Project Structure

```text
decision-assistant/
├── app.py
├── laptops.json
├── test_scenarios.md
├── obstacle.md
├── README.md
├── .env
├── .gitignore
└── .venv/
```

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/amaanshahk/learning-fest.git
cd learning-fest/AI/decision-assistant
```

### 2. Create and activate a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install openai python-dotenv
```

### 4. Configure the API key

Create a `.env` file in the project directory:

```env
GROQ_API_KEY=your_groq_api_key
```

### 5. Run the application

```bash
python3 app.py
```

Enter your laptop requirements when prompted.

## How It Works

1. The user submits a request in natural language.
2. The LLM interprets the requirements.
3. The LLM invokes the Python recommendation function using structured arguments.
4. Python filters the local dataset and calculates ranking scores.
5. The LLM uses the tool results to explain the matching options and recommendation.

## Ranking Formula

Each laptop receives a score calculated as:

`Score = Rating + Battery Hours`

Price and RAM are used for filtering, not ranking.

## Testing

Four scenarios were tested:

- Ambiguous request.
- Impossible requirements.
- Multiple constraints.
- Budget-only request.

All four scenarios passed. See [test_scenarios.md](test_scenarios.md) for details.

## Limitations

- The dataset contains illustrative sample laptop records, not verified real-world product listings.
- Recommendations are limited to the available dataset.
- Ranking uses a simple rating-plus-battery formula.
- An active internet connection and a valid Groq API key are required for LLM responses.

## Security

The API key is stored in `.env` and excluded from Git using `.gitignore`. The virtual environment is also excluded.
