import json
import requests

with open("config.json", "r") as file:
    config = json.load(file)

api_url = config["api_url"]

def get_country_data():
    cname = input("Enter a country name: ")
    url = api_url+cname
    try:
        response = requests.get(url,
        headers={"User-Agent": "curl/8.0"},
        timeout=10)
        rcode = response.status_code
        if rcode == 404: print("Country not found.")
        else: 
            response_data = response.json()
            if not isinstance(response_data, list):
                print("Unexpected response from API.")
                return
            found = False
            for i in response_data:
                if i["name"] == cname:
                    found = True
                    languages = []
                    for j in i.get("languages", []):
                        languages.append(j.get("name", "Not available"))
                    currencies = []
                    for j in i.get("currencies", []):
                        currencies.append(j.get("name", "Not available"))
                    country_data={ "capital" : i.get("capital", "Not available"),
                    "population": i.get("population", "Not available"),
                    "region": i.get("region","Not Available"),
                    "borders": i.get("borders","Not Available"),
                    "languages": languages,
                    "currencies": currencies}
            if found:
                print(f"\nCountry: {cname}")
                print(f"Capital: {country_data['capital']}")
                print(f"Population: {country_data['population']}")
                print(f"Region: {country_data['region']}")
                print(f"Borders: {country_data['borders']}")
                print(f"Languages: {country_data['languages']}")
                print(f"Currencies: {country_data['currencies']}")
            else:
                print("Country not found.")
    except requests.exceptions.RequestException:
        print("Network error. Please check your internet connection.")

get_country_data()
