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
    console.log(response.data);
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#wind");
    let humiElement = document.querySelector("#humi");
    let dtElement = document.querySelector("#dt");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    humiElement.innerHTML = `${response.data.main.humidity}%`;
    dtElement.innerHTML = formatDate(response.data.dt * 1000);
    console.log(response.data);
}

let apiKey = "3332c3356f67e41032d8159fde794731";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Mudgee&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(showWeather);

//let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//axios.get(url).then(showWeather);