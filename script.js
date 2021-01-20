// time and date
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date (timestamp)
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[monthIndex];

  return `${day}, ${date.getDate()} ${month}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
  ];
  let currentDay = days[now.getDay()];
  return `${currentDay}`;
}



//weather, city and country
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
 
  celsiusTemperature = response.data.main.temp;
}
//forecast weather

function dipsplayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 5; index++) {
    forecast = response.data.daily[index];

    forecastElement.innerHTML += `
    <div class="col-2">
        <h6>${formatTime(forecast.dt * 1000)}</h6>
         <img src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" alt="${forecast.weather[0].icon}" />
        <div class="weather-forecast-temperature">
        <strong>${Math.round(forecast.main.temp.max)}°</strong>| ${Math.round(forecast.main.temp.min)}°
        </div>
    </div>
    `;
  }
}


//search results
function searchCity(city) {
  let apiKey = "4007b2458c5f1847227a709637cbc50d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);


apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,minutely&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  let city = document.querySelector("#city-input").value;
  event.preventDefault();
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "4007b2458c5f1847227a709637cbc50d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//convert temperature
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) /5 +32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//sunrise sunset

function sunriseSunsetTime(timestamp) {
let sunriseSunset = new Date(timestamp);
let hours = sunriseSunset.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes= sunriseSunset.getMinutes();
if (minutes = `0${minutes}`)
}
return `${hours}:${minutes}`;

//action - date and time

let dateElement = document.querySelector("#date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

let timeElement = document.querySelector("#time");
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

//action - sunrise sunset

document.querySelector("#sunrise").innerHTML = sunriseSunsetTime (response.data.sys.sunrise * 1000);
document.querySelector("#sunset").innerHTML = sunriseSunsetTime (response.data.sys.sunset * 1000);

//action - convert temperatures

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);


//action - search results

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Madrid");





