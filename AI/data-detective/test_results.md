# Test Results – AI Data Detective

| Test | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| 1 | What is revenue? | Direct conceptual answer without tool call | LLM answered directly | PASS |
| 2 | What is the total revenue? | Calculate total and average revenue | Total: ₹833,700; Average: ₹41,685 | PASS |
| 3 | Show all sales from Kerala. | Return 7 matching records | 7 records displayed in a table | PASS |
| 4 | Find the highest and lowest sales. | Highest: Order 1009; Lowest: Order 1016 | Correct orders and revenue displayed | PASS |
| 5 | Show sales from Mumbai. | Report no matching records | Friendly no-records message displayed | PASS |

## Summary
- Total tests: 5
- Passed: 5
- Failed: 0

## Interface Validation
- Dataset overview metrics displayed correctly.
- Conceptual answers displayed as natural language.
- Revenue calculations displayed using metric cards.
- Region filtering displayed results in a table.
- Empty results displayed a friendly message.
- Highest and lowest sales displayed separately.
- Dataset preview available.
