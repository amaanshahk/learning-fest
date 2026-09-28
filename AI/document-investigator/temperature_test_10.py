import json
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY")
)

with open("messy_document.txt", "r") as file:
    document = file.read()

extraction_prompt = """
Extract the important factual claims from the document.

Return only valid JSON in this format:

{
    "facts": [
        {
            "topic": "",
            "claim": ""
        }
    ]
}

Include important facts about dates, numbers, events, project status,
staffing, budget, performance, and security incidents.

Do not resolve contradictions.
Do not decide which claim is correct.
Do not add information that is not present in the document.
Ignore irrelevant information.
Keep each claim to one short sentence.
Extract only the facts necessary for detecting contradictions.
Do not extract every detail from the document.

Document:
""" + document

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {
            "role": "user",
            "content": extraction_prompt
        }
    ],
    temperature=1.0,
    max_tokens=4000
)

extracted = response.choices[0].message.content
extracted = json.loads(extracted)

with open("extraction_10.json", "w") as file:
    json.dump(extracted, file, indent=4)


# Stage 2: Contradiction Detection

with open("extraction_10.json", "r") as file:
    facts = json.load(file)

contradiction_prompt = """
You are a contradiction detection system.

Compare the extracted facts below and identify factual contradictions.

Two facts are contradictory when they make incompatible claims about
the same topic, date, number, status, or event.

For every contradiction:
- Preserve both original claims.
- State clearly what conflicts.
- Do not decide which claim is correct.
- Do not invent information.
- Do not treat different dates or measurements as contradictions unless
  they are actually incompatible.
- Ignore facts that are simply additional information.

Return ONLY valid JSON in exactly this format:

{
    "contradictions": [
        {
            "topic": "",
            "claim_a": "",
            "claim_b": "",
            "conflict": ""
        }
    ]
}

Extracted facts:
""" + json.dumps(facts, indent=4)

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {
            "role": "user",
            "content": contradiction_prompt
        }
    ],
    temperature=1.0,
    max_tokens=8000
)

contradictions = response.choices[0].message.content

print("\n--- STAGE 2 RAW RESPONSE ---")
print(repr(contradictions))
print("--- END STAGE 2 RAW RESPONSE ---")

if not contradictions:
    print("\nStage 2 returned an empty response.")
    print("Finish reason:", response.choices[0].finish_reason)
    print("Full response:", response)
    raise SystemExit

if contradictions.startswith("```"):
    contradictions = contradictions.replace("```json", "").replace("```", "").strip()

try:
    contradictions = json.loads(contradictions)
except json.JSONDecodeError:
    print("\nStage 2 failed: model returned invalid JSON.")
    print("Raw response:")
    print(contradictions)
    raise SystemExit

with open("contradictions_10.json", "w") as file:
    json.dump(contradictions, file, indent=4)

print(json.dumps(contradictions, indent=4))


# Stage 3: Final Reasoning

with open("contradictions_10.json", "r") as file:
    contradictions = json.load(file)

reasoning_prompt = """
You are the final reasoning stage of a document investigation pipeline.

Use ONLY the extracted facts and detected contradictions provided below.

Your task is to produce a cautious investigation finding.

Rules:
- Do not invent facts.
- Do not resolve contradictions by guessing.
- Do not choose a source as correct unless the provided evidence explicitly supports doing so.
- Clearly distinguish confirmed facts from disputed information.
- Mention the important contradictions.
- Explain what can and cannot be concluded from the evidence.
- Do not use the original document.
- Base your reasoning only on the JSON provided below.

Return ONLY valid JSON in exactly this format:

{
    "conclusion": "",
    "confirmed_facts": [],
    "disputed_issues": [],
    "evidence_gaps": []
}

Detected contradictions:
""" + json.dumps(contradictions, indent=4)

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {
            "role": "user",
            "content": reasoning_prompt
        }
    ],
    temperature=1.0,
    max_tokens=3000
)

final_reasoning = response.choices[0].message.content

print("\n--- STAGE 3 RAW RESPONSE ---")
print(repr(final_reasoning))
print("--- END STAGE 3 RAW RESPONSE ---")

if not final_reasoning:
    print("\nStage 3 returned an empty response.")
    print("Finish reason:", response.choices[0].finish_reason)
    raise SystemExit

if final_reasoning.startswith("```"):
    final_reasoning = final_reasoning.replace("```json", "").replace("```", "").strip()

try:
    final_reasoning = json.loads(final_reasoning)
except json.JSONDecodeError:
    print("\nStage 3 failed: model returned invalid JSON.")
    print("Raw response:")
    print(final_reasoning)
    raise SystemExit

with open("final_reasoning_10.json", "w") as file:
    json.dump(final_reasoning, file, indent=4)

print(json.dumps(final_reasoning, indent=4))