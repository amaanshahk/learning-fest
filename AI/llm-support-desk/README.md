# AI Support Desk

An LLM-powered support ticket processor built for the μLearn Learning Fest 2026 AI Support Desk challenge.

The program takes customer support tickets, sends them to an LLM, and converts the responses into structured information containing:

* Category
* Urgency
* Suggested action

It also generates summaries showing the number of tickets in each category and urgency level.

## Tech Stack

* Python
* Groq API
* OpenAI Python SDK
* `openai/gpt-oss-20b`
* `python-dotenv`

## Project Structure

```text
.
├── support_desk.py
├── test_api.py
├── tickets.json
├── results.json
├── obstacle_log.md
├── .gitignore
└── README.md
```

## How It Works

1. Sample support tickets are loaded from `tickets.json`.
2. Each ticket is sent to the LLM with a prompt requesting structured JSON.
3. The returned JSON is parsed using Python.
4. API and JSON parsing errors are handled with `try/except`.
5. Category and urgency counts are generated.
6. The processed results are saved to `results.json`.

## Setup

Create a `.env` file in the project directory:

```env
GROQ_API_KEY=your_api_key_here
```

Install the required packages:

```bash
pip install openai python-dotenv
```

Run the program:

```bash
python3 support_desk.py
```

The API key is stored in `.env`, which is excluded from version control through `.gitignore`.

## Example Summary

```text
Category summary: {'billing': 3, 'technical': 2, 'account': 1, 'general': 0}
Urgency summary: {'high': 4, 'medium': 1, 'low': 1}
```

## Challenge

Built for:

**LLM-Powered Support Desk | LF 2026**

Hashtag: `#evn-lf26-ai6`

See `obstacle_log.md` for the API and implementation issues encountered during development and how they were resolved.
