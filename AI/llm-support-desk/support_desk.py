import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY")
)

with open("tickets.json", "r") as file:
    tickets = json.load(file)

results = []

for ticket in tickets:
    prompt = f"""Classify the support ticket into the given JSON format only based on the message. Return ONLY valid JSON. Do not include markdown, explanations, safety labels, or any other text.

Message: {ticket["message"]}

The response should have three fields: category, urgency, suggested_action.

Allowed values for category are: billing, technical, account, general

Allowed values for urgency are: low, medium, high
"""

    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {"role": "user", "content": prompt}
            ],
            timeout=30
        )

        result = response.choices[0].message.content
        result = result.replace("```json", "")
        result = result.replace("```", "")
        result = result.strip()

    except Exception as e:
        print("API call error:", e)
        continue

    try:
        result = json.loads(result)
        results.append(result)
        print(result)

    except json.JSONDecodeError:
        print("Could not parse LLM response.")
        print(result)


category_counts = {
    "billing": 0,
    "technical": 0,
    "account": 0,
    "general": 0
}

urgency_counts = {
    "high": 0,
    "medium": 0,
    "low": 0
}

for result in results:
    category_counts[result["category"]] += 1
    urgency_counts[result["urgency"]] += 1

print("Category summary:", category_counts)
print("Urgency summary:", urgency_counts)

with open("results.json", "w") as file:
    json.dump(results, file, indent=4)