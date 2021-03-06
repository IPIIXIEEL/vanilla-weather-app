function formatDate(timestamp) {
    //calculate the data
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    let day = days[date.getDay()];
    return ` ${day} ${hours}:${minutes}`;
}

function showWeather(response) {
    let temperatureElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#wind");
    let humiElement = document.querySelector("#humi");
    let dtElement = document.querySelector("#dt");
    let iconImage = document.querySelector("#icon");

    celciusTemp = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celciusTemp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    humiElement.innerHTML = `${response.data.main.humidity}%`;
    dtElement.innerHTML = formatDate(response.data.dt * 1000);
    iconImage.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconImage.setAttribute("alt", `${response.data.weather[0].description}`);
    //console.log(response.data.weather[0].icon);
}

function search(city) {
    let apiKey = "3332c3356f67e41032d8159fde794731";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showF(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp");
    //change active link
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let tempF = (celciusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(tempF);
}

function showC(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp");
    //change active link
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showF);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showC);