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
            for i in response_data:
                if i["name"] == cname:
                    languages = []
                    for j in i["languages"]:
                        languages.append(j["name"])
                    currencies = []
                    for j in i["currencies"]:
                        currencies.append(j["name"])
                    country_data={ "capital" : i["capital"],
                    "population": i["population"],
                    "region": i["region"],
                    "borders": i["borders"],
                    "languages": languages,
                    "currencies": currencies}
            print(country_data)
    except:
        print("Error!")

get_country_data()