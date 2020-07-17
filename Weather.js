//Date

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sat",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return ` ${date} ${month} | ${day} ${hours}:${minutes}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Units conversion

function fahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempF = Math.round(celsiusTemperature * 1.8 + 32);
  document.querySelector(".temperature").innerHTML = tempF;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  document.querySelector(".temperature").innerHTML = celsiusTemperature;
}
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", celsius);

// SHOW REAL DATA (TEMP+RAIN+CITY+DATE)
function showTemperature(response) {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<i class="fas fa-map-marker-alt" ></i > ${response.data.name}`;
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `<i class="fas fa-wind" ></i> ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let rain = document.querySelector(".rain");
  rain.innerHTML = `<i class="fas fa-tint" ></i> ${response.data.main.humidity} %`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = formatDate(response.data.dt * 1000);
  let img = document.querySelector("img");
  img.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = Math.round(response.data.main.temp);
}

// Forecast
function showForecast(response) {
  let forecast = document.querySelector(".card-deck");
  forecast.innerHTML = null;
  let firstForecast = null;

  for (let index = 0; index < 4; index++) {
    firstForecast = response.data.list[index];
    forecast.innerHTML += `<div class="p-3 mb-2 bg-transparent text-dark  text-center " style="max-width: 18rem;">
    <div class="card-header">${formatHours(firstForecast.dt * 1000)}</div>
      <div class="card-body text-primary">
          <img class="card-title" src="http://openweathermap.org/img/wn/${
      firstForecast.weather[0].icon
          }@2x.png"/>

       </div>
       <p class="card-text">
        ${Math.round(firstForecast.main.temp)} ºC
        </p>
      </div>
   </div>
   </div>`;
  }
}
// API GEO
function showPosition(position) {
  let key = "4bb3cd86107d7863d59c27f509800ed3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);

  // API GEO Forecast
  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(showForecast);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

//API Insert CIty

function search(city) {
  let key = "4bb3cd86107d7863d59c27f509800ed3";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);

  // API Insert City Forecast
  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showForecast);
}

// Insert City -> Temp
function handle(event) {
  event.preventDefault();
  let input = document.querySelector("#inputText");
  if (input.value === "") {
    alert("Please type something 🌍");
  } else {
    search(input.value);
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", handle);

search("Lisbon");
