const API_KEY = "93f2f8ee9f06d12a2e5c0c926f8da5a8";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const statusMessage = document.getElementById("status");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const conditions = document.getElementById("conditions");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const forecastList = document.getElementById("forecast-list");
const searchButton = searchForm.querySelector("button");

async function getWeather(city) {
statusMessage.textContent = "Loading weather and forecast...";
searchButton.disabled = true;
forecastList.innerHTML = "<p>Loading forecast...</p>";

try {
    const currentUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
    ]);

    if (!currentResponse.ok) {
        if (currentResponse.status === 404) {
            throw new Error("City not found. Check the spelling and try again.");
        }
        if (currentResponse.status === 401) {
            throw new Error("API key is invalid or not activated.");
        }
        throw new Error(`Weather request failed (${currentResponse.status}).`);
    }

    if (!forecastResponse.ok) {
        if (forecastResponse.status === 401) {
            throw new Error("API key is invalid or forecast access is unavailable.");
        }
        throw new Error(`Forecast request failed (${forecastResponse.status}).`);
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    cityName.textContent =
        `${currentData.name}, ${currentData.sys.country}`;
    temperature.textContent =
        `${Math.round(currentData.main.temp)}°C`;
    conditions.textContent =
        currentData.weather[0].description;
    feelsLike.textContent =
        `${Math.round(currentData.main.feels_like)}°C`;
    humidity.textContent =
        `${currentData.main.humidity}%`;
    wind.textContent =
        `${currentData.wind.speed} m/s`;

    displayForecast(forecastData);

    statusMessage.textContent = "";
    console.log("Current weather:", currentData);
    console.log("Forecast:", forecastData);

} catch (error) {
    statusMessage.textContent =
        error instanceof TypeError
            ? "Network error. Check your internet connection and try again."
            : error.message;

    forecastList.innerHTML = "";
    cityName.textContent = "Weather unavailable";
    temperature.textContent = "--°C";
    conditions.textContent = "Try searching for another city.";
    feelsLike.textContent = "--";
    humidity.textContent = "--";
    wind.textContent = "--";

    console.error("Weather error:", error);

} finally {
    searchButton.disabled = false;
}

}

function displayForecast(data) {
forecastList.innerHTML = "";

const dailyForecasts = {};

data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
    }

    dailyForecasts[date].push(item);
});

const days = Object.entries(dailyForecasts).slice(0, 5);

days.forEach(([date, entries]) => {
    const middayForecast =
        entries.find(item => item.dt_txt.includes("12:00:00")) ||
        entries[Math.floor(entries.length / 2)];

    const card = document.createElement("article");
    card.className = "forecast-card";

    const heading = document.createElement("h3");
    heading.textContent = new Date(date + "T12:00:00")
        .toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short"
        });

    const icon = document.createElement("img");
    icon.src =
        `https://openweathermap.org/img/wn/${middayForecast.weather[0].icon}.png`;
    icon.alt = middayForecast.weather[0].description;

    const description = document.createElement("p");
    description.textContent = middayForecast.weather[0].description;

    const temp = document.createElement("p");
    temp.className = "forecast-temp";
    temp.textContent = `${Math.round(middayForecast.main.temp)}°C`;

    card.append(heading, icon, description, temp);
    forecastList.appendChild(card);
});

}

searchForm.addEventListener("submit", event => {
event.preventDefault();

const city = cityInput.value.trim();

if (city) {
    getWeather(city);
}

});

getWeather("Thalassery");
