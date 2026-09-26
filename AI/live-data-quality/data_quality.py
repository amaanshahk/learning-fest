import requests
import pandas as pd

url = "https://api.openbrewerydb.org/v1/breweries?per_page=200"

try:
    response = requests.get(url, timeout=10)
    response.raise_for_status()

    data = response.json()

    if not isinstance(data, list):
        print("Unexpected API response.")
        exit()

    df = pd.DataFrame(data)

    print(df.head())

    print("\nColumns:")
    print(df.columns)

    print("\nData types:")
    print(df.dtypes)

    print("\nShape:")
    print(df.shape)

    print("\nMissing values:")
    print(df.isnull().sum())

    print("\nDuplicate records:")
    print(df.astype(str).duplicated().sum())

    print("\nDuplicate IDs:")
    print(df["id"].duplicated().sum())

    print("\nDuplicate names:")
    print(df["name"].duplicated().sum())

except requests.exceptions.Timeout:
    print("API request timed out.")

except requests.exceptions.RequestException:
    print("Network error while accessing the API.")

except ValueError:
    print("Invalid JSON response from the API.")

except Exception as e:
    print("Unexpected error:", e)


print("\nBrewery types:")
print(df["brewery_type"].value_counts())

print("\nCoordinate issues:")
print("Invalid longitude:", ((df["longitude"] < -180) | (df["longitude"] > 180)).sum())
print("Invalid latitude:", ((df["latitude"] < -90) | (df["latitude"] > 90)).sum())

print("\nWebsite URL issues:")
website_check = df["website_url"].dropna().str.startswith(("http://", "https://"))
print((~website_check).sum())

print("\nPhone formatting:")
phone_check = df["phone"].dropna().str.strip() == ""
print(phone_check.sum())

print("\nDuplicate brewery names:")
print(df[df["name"].duplicated(keep=False)][["id", "name", "city", "country"]].sort_values("name"))



cleaned_df = df.copy()

cleaned_df["address_1"] = cleaned_df["address_1"].fillna("Not Available")
cleaned_df["address_2"] = cleaned_df["address_2"].fillna("Not Available")
cleaned_df["address_3"] = cleaned_df["address_3"].fillna("Not Available")
cleaned_df["phone"] = cleaned_df["phone"].fillna("Not Available")
cleaned_df["website_url"] = cleaned_df["website_url"].fillna("Not Available")

cleaned_df["coordinates_available"] = (
    cleaned_df["latitude"].notna() &
    cleaned_df["longitude"].notna()
)

cleaned_df["latitude"] = cleaned_df["latitude"].fillna(0)
cleaned_df["longitude"] = cleaned_df["longitude"].fillna(0)

cleaned_df = cleaned_df.drop_duplicates(subset="id")

cleaned_df.to_csv("cleaned_data.csv", index=False)

print("\nCleaning completed.")
print("Original rows:", len(df))
print("Cleaned rows:", len(cleaned_df))
print("Saved as cleaned_data.csv")