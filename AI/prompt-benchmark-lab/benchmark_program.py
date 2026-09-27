import json
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY")
)

with open("test_cases.json", "r") as file:
    test_cases = json.load(file)

with open("prompts.json", "r") as file:
    prompts = json.load(file)

results = []

for ticket in test_cases:
    for prompt in prompts:
        prompt_text = list(prompt.values())[0]

        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "user",
                    "content": prompt_text + "\n\nSupport ticket:\n" + ticket["message"]
                }
            ]
        )

        results.append({
            "ticket": ticket,
            "prompt": list(prompt.keys())[0],
            "response": response.choices[0].message.content
        })

with open("results.json", "w") as file:
    json.dump(results, file, indent=4)