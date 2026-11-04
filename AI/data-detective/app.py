import pandas as pd
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role" : "system",
            "content" : "You are a sales data assistant"
        },
        {
            "role" : "user",
            "content": "What is revenue?"
        }
    ], model = "openai/gpt-oss-120b"
)

print(chat_completion.choices[0].message.content)

df = pd.read_csv("/home/amaanshahk/Desktop/learning-fest/AI/data-detective/sales.csv")

def filter_by_region(region):
    return df[df["region"] == region]

def calculate_revenue():
    return df["revenue"].sum(),  df["revenue"].mean()

def find_extreme_sales():
    return df.loc[df["revenue"].idxmax()], df.loc[df["revenue"].idxmin()]

print(find_extreme_sales())