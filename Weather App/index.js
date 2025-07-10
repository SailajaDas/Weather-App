
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temp");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather-search");

//  Convert country code to full name
const getCountryName = (code) => {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
};

//  Convert timestamp to formatted date & time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};


let city = "Bhubaneswar";


citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityInput = document.querySelector(".city_name");
  city = cityInput.value.trim();
  if (city) {
    getWeatherData();
  }
  cityInput.value = "";
});

//  Fetch Weather Data from OpenWeatherMap
const getWeatherData = async () => {
  const apiKey = "a8a86d17a4fee94a0ba25754d040f46e";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    
    if (data.cod !== 200) {
      cityName.innerHTML = "City not found";
      dateTime.innerHTML = "";
      return;
    }

    const { main, name, weather, wind, sys, dt } = data;

    // Injecting Data into DOM
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    w_forecast.innerHTML = weather[0].description; 
    w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather icon"/>`;

    w_temperature.innerHTML = `${main.temp.toFixed(1)}&#176;`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(0)}&#176;`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(0)}&#176;`;
    w_feelsLike.innerHTML = `${main.feels_like.toFixed(1)}&#176;`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;

    // Optional logging
    console.log(`Weather in ${name}: ${weather[0].main} (${weather[0].description})`);
  } catch (error) {
    console.error("Error fetching weather:", error);
    cityName.innerHTML = "Error loading data";
    dateTime.innerHTML = "";
  }
};


window.addEventListener("load", getWeatherData);
