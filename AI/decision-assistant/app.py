import json
import os
from dotenv import load_dotenv
from openai import OpenAI
from pathlib import Path

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def load_laptops():
    DATA_FILE = Path(__file__).parent / "laptops.json"
    with open(DATA_FILE, "r") as file:
        laptops = json.load(file)
    return laptops

laptops = load_laptops()

def filter_laptops(laptops, max_price=None, min_ram=None):
    filtered_laptops = []

    for laptop in laptops:
        if max_price is not None and laptop["price"] > max_price:
            continue

        if min_ram is not None and laptop["ram_gb"] < min_ram:
            continue

        filtered_laptops.append(laptop)

    return filtered_laptops


def score_laptops(laptops, min_rating=0, min_battery=0):
    scored_laptops = []

    for laptop in laptops:
        if laptop["rating"] < min_rating:
            continue

        if laptop["battery_hours"] < min_battery:
            continue

        score = laptop["rating"] + laptop["battery_hours"]

        scored_laptops.append({
            "laptop": laptop,
            "score": score
        })

    return sorted(
        scored_laptops,
        key=lambda item: item["score"],
        reverse=True
    )

def recommend_laptops(laptops, max_price=None, min_ram=None, min_rating=0, min_battery=0):
    result = filter_laptops(laptops, max_price, min_ram)
    ranked_results = score_laptops(result, min_rating, min_battery)
    return ranked_results

tools = [
    {
        "type": "function",
        "function": {
            "name": "recommend_laptops",
            "description": "Filter and rank laptops based on user requirements.",
            "parameters": {
                "type": "object",
                "properties":{
                    "max_price": {
                        "type": "integer",
                        "description": "Maximum laptop budget in INR."
                    },
                    "min_ram": {
                        "type": "integer",
                        "description": "Minimum ram in GB"
                    },
                    "min_rating":{
                        "type": "number",
                        "description": "Minimum rating out of 5."
                    },
                    "min_battery":{
                        "type" : "number",
                        "description": "Minimum battery in hours."
                    }
                },
                "required": [],
                "additionalProperties": False
            }
        }
    }
]
system_prompt = """
You are a Laptop Decision Assistant.

Follow these rules strictly:

1. Use the Python tool results as the authoritative source for all laptop specifications, prices, ratings, battery life, and scores.

2. Never invent, assume, or modify laptop specifications.
Only mention information present in the dataset.

3. Explain that laptops are filtered using the user's requirements:
budget, RAM, rating, and battery life.

4. The ranking score is calculated exclusively using:
rating + battery_hours.

5. Do not claim that price, RAM, processor, or storage
contributes to the ranking score.

6. Structure your final response into two sections:

DATASET FACTS:
Present the matching laptops and their actual specifications.

AI RECOMMENDATION:
Explain which laptop you recommend and why,
based on the available data and the user's requirements.

7. If no laptops match, clearly state that no matching
options were found. Never fabricate alternatives.

8. Distinguish objective dataset facts from your own
recommendation.

9. Do not use subjective or comparative claims
such as "modern", "powerful", or "better processor"
unless the dataset explicitly supports them.
"""
user_query = input("What laptop are you looking for? ")
response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": user_query
        }
    ],
    tools=tools,
    tool_choice="auto",
)

if not response.choices[0].message.tool_calls:
    print("\nAI Assistant:")
    print(response.choices[0].message.content)
    exit()

tool_call = response.choices[0].message.tool_calls[0]

function_name = tool_call.function.name
arguments = json.loads(tool_call.function.arguments)
if "max_price" in arguments and (
    not isinstance(arguments["max_price"], int)
    or arguments["max_price"] < 0
):
    print("Invalid budget provided.")
    exit()

if "min_ram" in arguments and (
    not isinstance(arguments["min_ram"], int)
    or arguments["min_ram"] <= 0
):
    print("Invalid RAM requirement.")
    exit()

print("Function:", function_name)
print("Arguments:", arguments)

if function_name == "recommend_laptops":
    results = recommend_laptops(laptops, **arguments)
    tool_output = json.dumps(results)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_query},
        response.choices[0].message,
        {
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": tool_output
        }
    ]
    final_response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages
    )

    print("\nAI Recommendation:")
    print(final_response.choices[0].message.content)

    if results:
        print("\nRecommended laptops:")
        for item in results:
            print(item["laptop"]["name"], "Score:", item["score"])
    else:
        print("\nNo matching laptops found.")
else:
    print("Sorry, I couldn't process that request.")