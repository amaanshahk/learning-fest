# Obstacle Log

## 1. Gemini API Authentication Error

I initially tried using the Gemini API with the Google GenAI Python SDK. The API returned `401 UNAUTHENTICATED` errors even though the API key was loaded correctly from the `.env` file.

I tested the API directly using `curl` and Python `requests`, but the same authentication error occurred. I also tried creating a new Gemini API key, but the issue persisted.

## 2. OpenAI API Credits

I tested the OpenAI API as an alternative. The API responded with a `429` error because the account had no API credits remaining.

## 3. Anthropic API Credits

I also tested the Anthropic API. The request reached the API successfully, but it returned an error stating that the credit balance was too low.

## 4. OpenRouter Rate Limit

I initially used OpenRouter with a free model. After several API requests, the daily free-model limit was reached, resulting in `429` rate-limit errors.

## 5. Switching to Groq

I switched to Groq as another OpenAI-compatible API provider. A direct API test successfully returned `OK`, confirming that the API key and connection were working.

The support desk was then updated to use the Groq API with the `openai/gpt-oss-20b` model.

## 6. Environment Variable Issue

After switching to Groq, the support desk initially returned `401 Missing Authentication header` errors. The Groq API key itself was valid, but the script was still using the wrong environment variable.

I updated the client to use `GROQ_API_KEY` from the `.env` file. After this change, all six support tickets were processed successfully.

## Final Result

The final implementation successfully:

* Processes six sample support tickets.
* Classifies each ticket by category.
* Assigns an urgency level.
* Generates a suggested action.
* Parses the LLM response as JSON.
* Produces category and urgency summaries.
* Saves the processed results to `results.json`.
