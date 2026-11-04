import json
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq()

DATA_PATH = Path(__file__).parent / "sales.csv"
df = pd.read_csv(DATA_PATH)


def filter_by_region(region):
    region = region.strip()
    result = df[
        df["region"].str.casefold() == region.casefold()
    ]
    return result.to_dict(orient="records")


def calculate_revenue():
    return {
        "total_revenue": int(df["revenue"].sum()),
        "average_revenue": float(df["revenue"].mean())
    }


def find_extreme_sales():
    highest = df.loc[df["revenue"].idxmax()].to_dict()
    lowest = df.loc[df["revenue"].idxmin()].to_dict()

    return {
        "highest_sale": highest,
        "lowest_sale": lowest
    }


tools = [
    {
        "type": "function",
        "function": {
            "name": "filter_by_region",
            "description": "Find all sales records from a specified region.",
            "parameters": {
                "type": "object",
                "properties": {
                    "region": {
                        "type": "string",
                        "description": "The region to filter by."
                    }
                },
                "required": ["region"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calculate_revenue",
            "description": "Calculate the total and average revenue across all sales.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "find_extreme_sales",
            "description": "Find the orders with the highest and lowest revenue.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    }
]


available_functions = {
    "filter_by_region": filter_by_region,
    "calculate_revenue": calculate_revenue,
    "find_extreme_sales": find_extreme_sales
}


SYSTEM_PROMPT = """
You are an AI Data Detective analysing a sales dataset.

You can answer general conceptual questions directly.

For questions requiring facts or calculations from the dataset,
you MUST use the appropriate Python tool.

Never invent dataset values or calculate dataset statistics yourself.
Only report numerical results supported by tool outputs.

If a tool returns no records, clearly explain that no matching
records were found.

If a question is unrelated to the dataset, answer normally.

All monetary values in the dataset are in Indian Rupees (INR).
Always use ₹ when displaying revenue, prices, or other monetary values.
Never use $.

If the user asks only for the meaning or definition of a term,
answer conceptually without calling a tool.

For example:
- "What is revenue?" → Give a conceptual definition.
- "What does revenue mean?" → Give a conceptual definition.
- "What is the total revenue?" → Use calculate_revenue.
- "What is the average revenue?" → Use calculate_revenue.

"""


def ask_question(question):
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": question}
    ]

    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=messages,
            tools=tools,
            tool_choice="auto",
            temperature=0
        )

        assistant_message = response.choices[0].message

        if not assistant_message.tool_calls:
            return assistant_message.content

        results = []

        for tool_call in assistant_message.tool_calls:
            function_name = tool_call.function.name

            try:
                arguments = json.loads(
                    tool_call.function.arguments
                )

                if function_name not in available_functions:
                    result = {"error": "Unknown tool requested."}
                else:
                    function = available_functions[function_name]
                    result = function(**arguments)

                results.append({
                    "tool": function_name,
                    "result": result
                })

            except Exception as error:
                results.append({
                    "tool": function_name,
                    "error": str(error)
                })

        return json.dumps(results, indent=2, default=str)

    except Exception as error:
        return f"An error occurred: {error}"


if __name__ == "__main__":
    print("AI Data Detective")
    print("Ask questions about the sales dataset.")
    print("Type 'exit' to quit.\n")

    while True:
        question = input("You: ").strip()

        if question.lower() in ("exit", "quit"):
            print("Goodbye!")
            break

        if not question:
            print("Please enter a question.")
            continue

        print("\nAssistant:", ask_question(question), "\n")