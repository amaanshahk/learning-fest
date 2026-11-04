
import json

import pandas as pd
import streamlit as st

from app import ask_question, df


st.set_page_config(
    page_title="AI Data Detective",
    page_icon="🔎",
    layout="wide"
)

st.title("🔎 AI Data Detective")
st.caption("Ask questions. Investigate your sales data.")

with st.sidebar:
    st.header("Dataset Overview")

    st.metric("Total Records", len(df))
    st.metric("Total Revenue", f"₹{df['revenue'].sum():,.0f}")
    st.metric("Average Revenue", f"₹{df['revenue'].mean():,.2f}")

    st.divider()

    st.subheader("Available Tools")
    st.write("1. Filter sales by region")
    st.write("2. Calculate total and average revenue")
    st.write("3. Find highest and lowest sales")

    if st.button("Clear conversation"):
        st.session_state.messages = []
        st.rerun()


def display_answer(answer):
    try:
        data = json.loads(answer)
    except (json.JSONDecodeError, TypeError):
        st.markdown(answer)
        return

    if not isinstance(data, list):
        st.write(data)
        return

    for item in data:
        tool = item.get("tool")
        result = item.get("result")
        error = item.get("error")

        if error:
            st.error(error)
            continue

        if tool == "calculate_revenue":
            col1, col2 = st.columns(2)

            col1.metric(
                "Total Revenue",
                f"₹{result['total_revenue']:,.2f}"
            )

            col2.metric(
                "Average Revenue",
                f"₹{result['average_revenue']:,.2f}"
            )

        elif tool == "filter_by_region":
            if not result:
                st.info("No matching sales records were found.")
            else:
                sales = pd.DataFrame(result)

                st.success(f"Found {len(sales)} matching records.")

                st.dataframe(
                    sales,
                    width="stretch",
                    hide_index=True
                )

                st.metric(
                    "Total Revenue",
                    f"₹{sales['revenue'].sum():,.2f}"
                )

        elif tool == "find_extreme_sales":
            highest = result["highest_sale"]
            lowest = result["lowest_sale"]

            col1, col2 = st.columns(2)

            with col1:
                st.subheader("Highest Sale")
                st.metric(
                    "Revenue",
                    f"₹{highest['revenue']:,.2f}"
                )
                st.write(f"Order ID: {highest['order_id']}")
                st.write(f"Product: {highest['product']}")
                st.write(f"Region: {highest['region']}")

            with col2:
                st.subheader("Lowest Sale")
                st.metric(
                    "Revenue",
                    f"₹{lowest['revenue']:,.2f}"
                )
                st.write(f"Order ID: {lowest['order_id']}")
                st.write(f"Product: {lowest['product']}")
                st.write(f"Region: {lowest['region']}")

        else:
            st.write(result)


if "messages" not in st.session_state:
    st.session_state.messages = []


for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        if message["role"] == "assistant":
            display_answer(message["content"])
        else:
            st.markdown(message["content"])


question = st.chat_input("Ask something about your sales data...")

if question:
    st.session_state.messages.append({
        "role": "user",
        "content": question
    })

    with st.chat_message("user"):
        st.markdown(question)

    with st.chat_message("assistant"):
        with st.spinner("Investigating your data..."):
            answer = ask_question(question)
            display_answer(answer)

    st.session_state.messages.append({
        "role": "assistant",
        "content": answer
    })


with st.expander("View sales dataset"):
    st.dataframe(df, width="stretch", hide_index=True)
