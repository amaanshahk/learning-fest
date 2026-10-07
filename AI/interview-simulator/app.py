import os
import json
from dotenv import load_dotenv
from openai import OpenAI
import streamlit as st

load_dotenv()

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY")
)

st.title("AI Interview Coach")
st.write("Welcome to the AI Interview Simulator!")
role = st.selectbox(
    "Select your role",
    ["Software Developer", "Data Analyst", "UI/UX Designer"]
)

difficulty = st.selectbox(
    "Select difficulty",
    ["Easy", "Medium", "Hard"]
)
if "started" not in st.session_state:
    st.session_state.started = False

if "questions" not in st.session_state:
    st.session_state.questions = []

if "answers" not in st.session_state:
    st.session_state.answers = []

if "evaluations" not in st.session_state:
    st.session_state.evaluations = []

def generate_question():
    response = client.chat.completions.create(
        model = "openai/gpt-oss-20b",
        messages=[
            {"role": "user", "content": f"""
            You are conducting a job interview as an experienced recruiter of 10 years.

            Role: {role}
            Difficulty: {difficulty}

            Generate one interview question appropriate for this role and difficulty based on the current industry standards and relevance.
            """}
        ]
    )
    return response.choices[0].message.content 

def evaluate_answer(question, answer):
    response = client.chat.completions.create(
        model = "openai/gpt-oss-20b",
        messages=[
            {"role": "user", "content": f"""
            You are evaluating a job interview response as an experienced recruiter of 10 years.

            Role: {role}
            Difficulty: {difficulty}
            Question: {question}
            Answer: {answer}

            Evaluate the answer given based on the question and return structured data containing correctness, depth and clarity marked between values 1-5 in JSON format given below {{"correctness": a value, "depth": a value, "clarity": a value}}.
            """}
        ]
    )
    return response.choices[0].message.content

if st.button("Start Interview"):
    st.session_state.started = True
    st.session_state.questions = []
    st.session_state.answers = []
    st.session_state.evaluations = []

    st.write(f"Starting {difficulty} interview for {role}...")
    question = generate_question()
    st.session_state.questions.append(question)

if st.session_state.questions:
    st.write(st.session_state.questions[-1])

answer = st.text_area("Your answer")
if st.button("Submit Answer"):
    st.session_state.answers.append(answer)
    
    question = st.session_state.questions[-1]
    evaluation = evaluate_answer(question, answer)
    evaluation = json.loads(evaluation)
    st.session_state.evaluations.append(evaluation)
    question = generate_question()
    st.session_state.questions.append(question)
    st.rerun()