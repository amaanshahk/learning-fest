# Obstacle Log

## 1. REST Countries API issue

The initial REST Countries API endpoint did not work as expected. A `curl` request returned a `301` redirect, so I tested an alternative API.

## 2. Python request was hanging

The `countries.dev` API worked correctly with `curl`, but the Python `requests.get()` call initially appeared to hang.

## 3. User-Agent header

I found that adding a `User-Agent` header to the Python request allowed the API request to work correctly.

```python
headers={"User-Agent": "curl/8.0"}
```

## 4. Invalid country input

Entering an unknown country such as `Atlantis` resulted in an HTTP `404` response. I added handling for the `404` status code.

```text
Country not found.
```

## 5. Missing API fields

Some countries do not have every field. For example, Japan does not have land borders. I used `.get()` with fallback values to prevent the program from crashing when fields are missing.

## 6. Unexpected API response

The program now checks whether the API response is a list before processing it. This prevents unexpected response formats from causing errors.

## 7. Network failures

Network-related exceptions are handled using `requests.exceptions.RequestException`.

```text
Network error. Please check your internet connection.
```

## 8. Case-insensitive country input

Country names are matched without considering letter case, so inputs such as `India`, `india`, and `INDIA` work correctly.
