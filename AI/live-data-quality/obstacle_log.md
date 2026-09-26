# Obstacle Log

## 1. API Timeout

The API request initially timed out while using Python requests.

### Solution

Added a timeout and exception handling for API requests using `try/except`. The program now handles timeout and network errors without crashing.

## 2. Nested Data and Duplicate Check

The API response contained nested lists and dictionaries in some columns. Using `DataFrame.duplicated()` directly caused an error because some values were unhashable.

### Solution

Converted the DataFrame values to strings when checking for exact duplicate records.

## 3. Missing Data

Several brewery records contained missing addresses, coordinates, phone numbers, and website URLs.

### Solution

Missing text values were replaced with `Not Available`. Missing coordinates were retained as missing information and tracked using a `coordinates_available` column.

## 4. Duplicate Brewery Names

Some brewery names appeared more than once.

### Solution

The repeated names were manually checked and retained because they represented separate breweries/locations with different IDs. Duplicate IDs were used as the actual duplicate-record criterion.
