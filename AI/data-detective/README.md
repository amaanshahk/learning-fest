# AI Data Detective

An AI-powered data analysis application that allows users to ask natural-language questions about a sales dataset. It uses an LLM to understand user queries and Python tools to perform accurate, deterministic data operations.

## Features

- **Natural Language Queries:** Ask questions about the sales dataset in plain English.
- **Intelligent Tool Selection:** The LLM determines whether a question requires a Python data-analysis tool or a direct conceptual response.
- **Region-Based Filtering:** Retrieve sales records for a specified region.
- **Revenue Analysis:** Calculate total and average revenue.
- **Sales Analysis:** Identify the highest and lowest revenue transactions.
- **Interactive Interface:** Chat with the application through a Streamlit web interface.
- **Dataset Preview:** Inspect the underlying sales data directly in the application.
- **Error Handling:** Handle invalid tool arguments, API errors, and empty query results.

## Tech Stack

| Component | Technology |
|---|---|
| Programming Language | Python |
| Data Processing | Pandas |
| LLM Integration | Groq API |
| AI Model | OpenAI GPT-OSS 120B |
| Frontend | Streamlit |
| Configuration | Python Dotenv |

## Project Structure

```text
data-detective/
├── app.py
├── streamlit_app.py
├── sales.csv
├── requirements.txt
├── failure_analysis.md
├── test_results.md
├── .env
└── .gitignore
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd data-detective
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it:

**Linux/macOS**
```bash
source .venv/bin/activate
```

**Windows**
```bash
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure the API key

Create a `.env` file in the project directory:

```env
GROQ_API_KEY=your_groq_api_key
```

Obtain an API key from [Groq Console](https://console.groq.com/).

### 5. Run the application

Start the Streamlit interface:

```bash
streamlit run streamlit_app.py
```

Alternatively, run the command-line interface:

```bash
python app.py
```

## Available Data Analysis Tools

| Tool | Description |
|---|---|
| `filter_by_region(region)` | Retrieves sales records for a specified region. |
| `calculate_revenue()` | Calculates total and average revenue. |
| `find_extreme_sales()` | Identifies the highest and lowest revenue transactions. |

The Python functions perform the actual data operations, ensuring that dataset-specific results are based on the underlying records rather than generated estimates.

## Example Queries

- What is revenue?
- What is the total revenue?
- Calculate the average revenue.
- Show all sales from Kerala.
- Show sales from Mumbai.
- Find the highest and lowest sales.

## Dataset

The application uses `sales.csv`, containing sales transaction records with the following fields:

- `order_id`
- `order_date`
- `product`
- `category`
- `region`
- `quantity`
- `unit_price`
- `revenue`

All monetary values are represented in Indian Rupees (INR).

## Testing

Test scenarios and observed results are documented in:

- `test_results.md` – Functional test cases and results.
- `failure_analysis.md` – Identified issues, resolutions, and error-handling observations.

## Security

- Store API credentials in `.env`.
- Never commit API keys or other sensitive credentials.
- Keep `.env` and `.venv/` excluded through `.gitignore`.

## License

This project is available for educational and personal use.