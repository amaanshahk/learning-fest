import streamlit as st
import json
import app

st.set_page_config(
    page_title="Laptop Decision Assistant",
    page_icon="💻",
    layout="wide"
)

st.title("💻 Laptop Decision Assistant")
st.write("Find a laptop that matches your requirements using AI-powered recommendations.")

user_query = st.text_input(
    "What laptop are you looking for?",
    placeholder="Example: I need a laptop within ₹60,000 with 16GB RAM"
)

if st.button("Find Laptops"):
    if not user_query.strip():
        st.warning("Please describe your laptop requirements.")
    else:
        with st.spinner("Understanding your requirements..."):
            response = app.client.chat.completions.create(
                model="openai/gpt-oss-20b",
                messages=[
                    {"role": "system", "content": app.system_prompt},
                    {"role": "user", "content": user_query}
                ],
                tools=app.tools,
                tool_choice="auto"
            )
            message = response.choices[0].message

            if not message.tool_calls:
                st.info(message.content)
            else:
                tool_call = message.tool_calls[0]

                if tool_call.function.name == "recommend_laptops":
                    arguments = json.loads(tool_call.function.arguments)

                    results = app.recommend_laptops(
                        app.laptops,
                        **arguments
                    )

                    messages = [
                        {"role": "system", "content": app.system_prompt},
                        {"role": "user", "content": user_query},
                        message.model_dump(exclude_none=True),
                        {
                            "role": "tool",
                            "tool_call_id": tool_call.id,
                            "content": json.dumps(results)
                        }
                    ]

                    final_response = app.client.chat.completions.create(
                        model="openai/gpt-oss-20b",
                        messages=messages
                    )

                    st.markdown(final_response.choices[0].message.content)
