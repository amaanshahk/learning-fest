# AI Interview Coach

An AI-powered interview simulator built with Streamlit for Learning Fest 2026.

## Features

- Role selection: Software Developer, Data Analyst, UI/UX Designer
- Difficulty selection: Easy, Medium, Hard
- Dynamic interview question generation using an LLM
- Contextual follow-up questions based on previous interview interactions
- Structured answer evaluation using correctness, depth, and clarity
- Deterministic Python-based scoring
- AI-generated final performance report
- Personalized strengths, weaknesses, and improvement plan
- Streamlit session state for maintaining interview progress
- Automatic capture of sample evaluation output

## Tech Stack

- Python
- Streamlit
- OpenAI Python SDK
- Groq API
- python-dotenv

## How It Works

1. Select an interview role and difficulty.
2. Start the interview.
3. The LLM generates a relevant interview question.
4. Submit an answer.
5. The LLM evaluates the answer and returns structured JSON containing correctness, depth, and clarity scores from 1 to 5.
6. Python stores the evaluation and calculates the score deterministically.
7. The LLM generates the next question using the previous interview interaction as context.
8. After five questions, the interview is completed.
9. Python calculates the final score out of 75.
10. The LLM generates a personalized performance report based on the questions, answers, and evaluations.

## Scoring

Each answer is evaluated using three criteria:

| Criteria | Maximum Score |
|---|---:|
| Correctness | 5 |
| Depth | 5 |
| Clarity | 5 |
| Total per question | 15 |

With five questions, the maximum score is 75.

The final numerical score is calculated by Python from the structured evaluations. The LLM does not directly generate the final score.

## Setup

Clone the repository:

git clone https://github.com/amaanshahk/learning-fest.git
cd learning-fest/AI/interview-simulator

Create and activate a virtual environment:

python3 -m venv venv
source venv/bin/activate

Install the dependencies:

pip install streamlit openai python-dotenv

Create a .env file and add:

GROQ_API_KEY=your_api_key_here

Run the application:

streamlit run app.py

## Project Files

- app.py — Main Streamlit application.
- obstacle.md — Development obstacles and solutions.
- sample_evaluation.json — Automatically captured sample containing an actual interview question, answer, and structured evaluation.
- .gitignore — Prevents environment files and Python cache files from being committed.

## Testing

The application was tested with all three available roles:

- Software Developer
- Data Analyst
- UI/UX Designer

The interview flow, contextual question generation, structured evaluation, deterministic scoring, and AI-generated performance report were tested successfully.