import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-20b"


def generate_answer(question, contexts):
    context_text = "\n\n".join(
        f"[Source: {item['source']}]\n{item['text']}"
        for item in contexts
    )

    prompt = f"""
You are an assistant answering questions using the supplied knowledge base.

Rules:
- Use only the supplied context.
- Do not invent missing facts.
- If the context does not contain the answer, say that the information is unavailable.
- If sources contradict each other, explicitly identify the disagreement and name the sources.
- Do not silently choose one conflicting source.

Context:
{context_text}

Question:
{question}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    return response.choices[0].message.content
