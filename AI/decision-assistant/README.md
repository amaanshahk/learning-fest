# AI Decision Assistant – Laptop Recommendations

## Overview

The Laptop Decision Assistant is a Streamlit-based application that helps users choose laptops based on their requirements.

It combines a Large Language Model (LLM) with deterministic Python tools. The LLM interprets natural-language requests and calls Python functions to filter and rank laptops from a local JSON dataset.

The application clearly separates objective dataset facts from AI-generated recommendations.

## Features

- Local dataset containing 10 laptop records.
- Interactive Streamlit interface.
- Natural-language input.
- Groq API integration using an OpenAI-compatible client.
- LLM function calling.
- Deterministic Python filtering and ranking.
- Filtering by maximum price, minimum RAM, minimum rating, and minimum battery life.
- Handles ambiguous requests by asking for clarification.
- Handles impossible requirements without fabricating alternatives.
- Separates dataset facts from AI recommendations.

## Technology Stack

- Python
- Streamlit
- Groq API
- OpenAI Python SDK
- JSON
- python-dotenv

## Project Structure

```text
decision-assistant/
├── app.py
├── streamlit_app.py
├── laptops.json
├── requirements.txt
├── test_scenarios.md
├── obstacle.md
├── README.md
├── .gitignore
└── .env (local configuration, not committed)
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
pip install -r requirements.txt
```

### 4. Configure the API key

Create a `.env` file in the project directory:

```env
GROQ_API_KEY=your_groq_api_key
```

### 5. Launch the application

```bash
streamlit run streamlit_app.py
```

Open the local URL displayed in the terminal, usually:

`http://localhost:8501`

## How It Works

1. The user enters laptop requirements in natural language.
2. The LLM interprets the requirements.
3. The LLM invokes the Python recommendation function through function calling.
4. Python filters the local dataset and calculates ranking scores.
5. The LLM generates a response using the Python results.
6. Streamlit displays the matching laptop specifications and AI recommendation.

## Python Tools

The application uses three main functions:

- `filter_laptops()` – filters laptops by price and RAM.
- `score_laptops()` – applies rating and battery requirements and calculates scores.
- `recommend_laptops()` – combines filtering and ranking.

## Ranking Formula

Each laptop receives a score calculated as:

`Score = Rating + Battery Hours`

Price, RAM, rating, and battery life can be used as filtering criteria. Only rating and battery hours contribute to the ranking score.

## Testing

Five scenarios were tested:

1. Ambiguous request.
2. Impossible requirements.
3. Multiple constraints.
4. Budget-only request.
5. Rating-only request.

All five scenarios passed.

See [test_scenarios.md](test_scenarios.md) for the test details.

## Limitations

- The dataset contains illustrative sample laptop records, not verified real-world product listings.
- Recommendations are limited to the available dataset.
- Ranking uses a simple rating-plus-battery formula.
- An active internet connection and a valid Groq API key are required for LLM responses.

## Security

The API key is stored in `.env` and excluded from Git using `.gitignore`. The virtual environment and Python cache files are also excluded.