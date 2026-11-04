# Failure Analysis – AI Data Detective

## 1. Empty Dataset Lookup
- Input: Show me sales from Mumbai.
- Expected: No matching records should be reported.
- Actual: The Python filtering tool returned an empty result, and Streamlit displayed a clear no-records message.
- Status: Passed.

## 2. Conceptual Question
- Input: What is revenue?
- Expected: The LLM should answer directly without calling a Python tool.
- Initial Issue: The LLM sometimes selected the calculate_revenue tool.
- Resolution: Added explicit instructions to distinguish conceptual questions from dataset queries.
- Actual: The LLM provided a direct conceptual explanation.
- Status: Passed.

## 3. Groq Tool Calling Error
- Issue: Groq returned a 400 error when the model attempted another tool call during the follow-up response.
- Resolution: Removed the second LLM request and returned Python tool results directly.
- Actual: Tool execution became reliable, and results were formatted in Streamlit.
- Status: Resolved.

## 4. Dataset Calculation
- Input: What is the total revenue?
- Expected: The Python calculation tool should return exact values.
- Actual: Total revenue was ₹833,700 and average revenue was ₹41,685.
- Status: Passed.

## 5. Invalid or Unknown Tool Arguments
- Expected: Invalid arguments should be caught and returned as an error rather than crashing the application.
- Handling: The tool execution block catches exceptions and returns an error response.
- Status: Error handling implemented; not separately tested.
