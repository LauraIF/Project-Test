//date

let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

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
    "Dec"
];
let month = months[now.getMonth()];

let date = now.getDate();

let today = `${day} , ${date} ${month}`;

let h2 = document.querySelector("h2");
h2.innerHTML = `${today}  `;

//city

//temperature

function fahrenheit(event) {
    event.preventDefault();
    let temperature = 25;
    let tempF = Math.round(temperature * 1.8 + 32);

    document.querySelector(".temperature").innerHTML = tempF;
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", fahrenheit);

function celsius(event) {
    event.preventDefault();
    let temperature = 25;
    document.querySelector(".temperature").innerHTML = temperature;
}
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", celsius);

// Geo->Temp
function showTemperature(response) {
    console.log(response);
    let number = Math.round(response.data.main.temp);
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = `${number}`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = `<i class="fas fa-map-marker-alt" ></i > ${
        response.data.name
        }`;
    let h3 = document.querySelector("h3");
    h3.innerHTML = ` ${response.data.weather[0].description}`;
    let wind = document.querySelector(".wind");
    console.log(wind);
    wind.innerHTML = `<i class="fas fa-wind" ></i> ${
        response.data.wind.speed
        }km/h`;
    let rain = document.querySelector(".rain");
    rain.innerHTML = `<i class="fas fa-tint" ></i> ${
        response.data.main.humidity
        }%`;
}

function showPosition(position) {
    let key = "4bb3cd86107d7863d59c27f509800ed3";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

//Insert city -> Temp

function search(event) {
    event.preventDefault();
    let input = document.querySelector("#inputText");
    let key = "4bb3cd86107d7863d59c27f509800ed3";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${
        input.value
        }&appid=${key}&units=metric`;
    axios.get(url).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);


