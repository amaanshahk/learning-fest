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

if "question_count" not in st.session_state:
    st.session_state.question_count = 0

def generate_question():
    if st.session_state.questions:
        previous_context = f"""
        Previous question: {st.session_state.questions[-1]}
        Candidate answer: {st.session_state.answers[-1]}
        Previous evaluation: {st.session_state.evaluations[-1]}
        """
    else:
        previous_context = "No previous interview interaction."

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": f"""
                You are conducting a job interview as an experienced recruiter of 10 years.

                Role: {role}
                Difficulty: {difficulty}

                {previous_context}

                Generate one relevant interview question based on the role,
                difficulty, and previous interview interaction. Avoid repeating
                the previous question.
                """
            }
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

def calculate_score(evaluations):
    total = 0

    for evaluation in evaluations:
        score = (
            evaluation["correctness"]
            + evaluation["depth"]
            + evaluation["clarity"]
        )
        total += score

    return total

def generate_final_report():
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": f"""
                You are an experienced interview coach.

                Role: {role}
                Difficulty: {difficulty}

                Here is the candidate's complete interview:

                Questions:
                {st.session_state.questions}

                Answers:
                {st.session_state.answers}

                Evaluations:
                {st.session_state.evaluations}

                Analyze the candidate's overall performance.

                Return a report with exactly these three sections:

                Strengths:
                - Give specific strengths based on the candidate's actual answers.

                Weaknesses:
                - Identify specific areas that need improvement based on the actual answers and evaluations.

                Improvement Plan:
                - Give specific, actionable recommendations based on the candidate's weaknesses.

                Do not give a numerical score.
                Do not make generic recommendations.
                Base the report on the candidate's actual interview responses.
                """
            }
        ]
    )

    return response.choices[0].message.content

if st.button("Start Interview"):
    st.session_state.started = True
    st.session_state.questions = []
    st.session_state.answers = []
    st.session_state.evaluations = []
    st.session_state.question_count = 0

    st.write(f"Starting {difficulty} interview for {role}...")
    question = generate_question()
    st.session_state.questions.append(question)
    st.session_state.question_count += 1

if st.session_state.questions:
    st.write(st.session_state.questions[-1])

answer = st.text_area("Your answer")

if st.button("Submit Answer"):
    if answer.strip():
        st.session_state.answers.append(answer)

        question = st.session_state.questions[-1]
        evaluation = evaluate_answer(question, answer)
        evaluation = json.loads(evaluation)

        sample = {
            "question": question,
            "answer": answer,
            "evaluation": evaluation
        }
        with open("sample_evaluation.json", "w") as file:
            json.dump(sample, file, indent=4)
        st.session_state.evaluations.append(evaluation)

        if st.session_state.question_count >= 5:
            st.session_state.started = False
            total_score = calculate_score(st.session_state.evaluations)
            st.success("Interview completed!")
            st.write(f"Total Score: {total_score}/75")

            report = generate_final_report()
            st.markdown(report)

        else:
            question = generate_question()
            st.session_state.questions.append(question)
            st.session_state.question_count += 1

            st.rerun()

    else:
        st.warning("Please enter an answer before submitting.")