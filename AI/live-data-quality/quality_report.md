# Data Quality Report

## Dataset

- Source: Open Brewery DB API
- Endpoint: https://api.openbrewerydb.org/v1/breweries?per_page=200
- Records analyzed: 200
- Columns: 16

## Data Quality Issues Found

### 1. Missing Values

The dataset contains missing values in several fields:

| Field | Missing |
|---|---:|
| address_1 | 14 |
| address_2 | 193 |
| address_3 | 199 |
| longitude | 47 |
| latitude | 47 |
| phone | 21 |
| website_url | 27 |
| street | 14 |

Missing text fields were replaced with `Not Available`.

Missing latitude and longitude values were retained as missing information but represented as `0` in the cleaned dataset. A `coordinates_available` column was added to distinguish available coordinates from missing ones.

### 2. Duplicate Records

No exact duplicate records were found.

No duplicate IDs were found.

Four repeated brewery names were found. These were not removed because the records represented breweries with different IDs and/or locations. Therefore, repeated names were treated as valid rather than incorrectly deleting legitimate records.

### 3. Incomplete Geographic Information

47 records were missing both latitude and longitude.

The dataset was checked for invalid coordinate ranges:

- Invalid longitude values: 0
- Invalid latitude values: 0

The cleaned dataset adds a `coordinates_available` field to clearly identify records with geographic coordinates.

## Basic Statistics

- Total records: 200
- Total columns: 16
- Duplicate records: 0
- Duplicate IDs: 0
- Missing coordinate records: 47
- Missing phone numbers: 21
- Missing website URLs: 27

## Cleaning Summary

The cleaning process:

- Filled missing address, phone, and website values with `Not Available`.
- Added `coordinates_available`.
- Replaced missing latitude and longitude values with `0`.
- Removed duplicate records based on ID. No records were removed because all IDs were unique.
- Preserved repeated brewery names because they represented separate records.

## Result

The cleaned dataset contains 200 records and is saved as `cleaned_data.csv`.
