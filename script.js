// time and date
function formatDate(date) {
  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[dayIndex];

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

function formatTime(time) {
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
  iconElement.setAttribute("alt", response.data[0].description);
 
  celsiusTemperature = response.data.main.temp;
}


//search results
function searchCity(city) {
  let apiKey = "4007b2458c5f1847227a709637cbc50d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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


//action - date and time

let dateElement = document.querySelector("#date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

let timeElement = document.querySelector("#time");
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

//action - sunrise sunset

//let sunriseElement = document.querySelector("#sunrise");
//let currentDate = new Date();
//sunriseElement.innerHTML = formatDate(currentDate);

//let sunsetElement = document.querySelector("#sunset");
//let currentTime = new Date();
//sunsetElement.innerHTML = formatTime(currentTime);

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





