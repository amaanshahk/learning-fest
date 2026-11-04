
import json
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
from groq import Groq


# Setup
load_dotenv()
client = Groq()

DATA_PATH = Path(__file__).parent / "sales.csv"
df = pd.read_csv(DATA_PATH)


# Python tools
def filter_by_region(region):
    """Return sales records for a given region."""
    region = region.strip()

    result = df[
        df["region"].str.casefold() == region.casefold()
    ]

    return result.to_dict(orient="records")


def calculate_revenue():
    """Calculate total and average revenue."""
    return {
        "total_revenue": int(df["revenue"].sum()),
        "average_revenue": float(df["revenue"].mean())
    }


def find_extreme_sales():
    """Find the highest and lowest revenue orders."""
    highest = df.loc[df["revenue"].idxmax()].to_dict()
    lowest = df.loc[df["revenue"].idxmin()].to_dict()

    return {
        "highest_sale": highest,
        "lowest_sale": lowest
    }


# Tool definitions for Groq
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


# Map tool names to Python functions
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

"""


# Ask the LLM and execute its requested tools
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
            tool_choice="auto"
        )

        assistant_message = response.choices[0].message
        messages.append(assistant_message)

        # No tool call: return the direct LLM answer
        if not assistant_message.tool_calls:
            return assistant_message.content

        # Execute requested Python tools
        for tool_call in assistant_message.tool_calls:
            function_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)

            if function_name not in available_functions:
                result = {"error": "Unknown tool requested."}
            else:
                try:
                    function = available_functions[function_name]
                    result = function(**arguments)
                except Exception as error:
                    result = {"error": str(error)}

            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result, default=str)
            })

        # Ask the LLM to interpret the Python results
        final_response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=messages
        )

        return final_response.choices[0].message.content

    except Exception as error:
        return f"An error occurred: {error}"


# Interactive terminal interface
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
