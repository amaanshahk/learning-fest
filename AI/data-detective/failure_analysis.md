# Failure Analysis – AI Data Detective

## 1. Empty Dataset Lookup
- Input: Show me sales from Mumbai.
- Expected: No matching records should be reported.
- Actual: The application correctly reported that no sales records were found.
- Status: Passed.

## 2. Conceptual Question
- Input: What is revenue?
- Expected: The LLM should answer directly without calling a Python tool.
- Actual: The LLM provided a conceptual explanation.
- Status: Passed.

## 3. Dataset Calculation
- Input: What is the total and average revenue?
- Expected: The Python calculation tool should return the exact values.
- Actual: Total revenue was ₹833,700 and average revenue was ₹41,685.
- Status: Passed.

## 4. Invalid or Unknown Tool Arguments
- Expected: Invalid arguments should be caught and returned as an error rather than crashing the application.
- Handling: The tool execution block catches exceptions and returns an error response.
- Status: Error handling implemented; not separately tested.