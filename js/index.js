function formatDate(timestamp){
let now = new Date(timestamp);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

return `${day}, ${displayHours(timestamp)}`;
}


function displayDay(timestamp){
  let now = new Date(timestamp);

  let day = now.getDate();
  if (day<10){
  day = `0${day}`;
}
  months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  let month = months[now.getMonth()];
  
  return `${day}/${month}`;
}

function displayHours(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if(minutes<10){
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}


function displayWeather(response){
  
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(response.data.wind.speed*3.6)} km/h`;

  document.querySelector("#current-time").innerHTML = formatDate(response.data.dt*1000);
  document.querySelector("#date-now").innerHTML = displayDay(response.data.dt*1000);

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt",response.data.weather[0].description);
 
}

function displayForecast(response){
      let weatherForecast = document.querySelector("#weather-forecast");
      weatherForecast.innerHTML = null;
      let forecast = null;
      for (let index = 0; index < 6; index++) {
     forecast = response.data.list[index];
    weatherForecast.innerHTML += `<div class="col-2 ">
                        <h3>${displayHours(forecast.dt*1000)}</h3> 
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                        <div class="weather-forecast-temperature">
                            <strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(forecast.main.temp_min)}°
                        </div>
                          <i class="fas fa-water"></i> ${forecast.main.humidity}%
                          <br />
                          <i class="fas fa-wind"></i> ${Math.round(forecast.wind.speed*3.6)} km/h
                    </div>`;
      }

}



function showPosition(position){
    let apiKey = "444dec86065a0dffc920fcea9a0aef12";
    let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

}

function showCurrentLocationWeather(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  
}

function searchCity(city) {
  let apiKey = "444dec86065a0dffc920fcea9a0aef12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
  &appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}


 function changeToFahrenheit(event){
     event.preventDefault();
     let temperature = document.querySelector("#temperature-value");
     celsiusUnit.classList.remove("active");
    fahrenehitUnit.classList.add("active");
     fahrenheitTemperature = Math.round(celsiusTemperature*9/5+32);
     temperature.innerHTML = fahrenheitTemperature;
 }

  function changeToCelsius(event){
   event.preventDefault();
   celsiusUnit.classList.add("active");
   fahrenehitUnit.classList.remove("active");
   let temperature = document.querySelector("#temperature-value");
   temperature.innerHTML = Math.round(celsiusTemperature);
 }

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", showCurrentLocationWeather);

let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", changeToCelsius);

let fahrenehitUnit = document.querySelector("#fahrenheit-unit");
fahrenehitUnit.addEventListener("click", changeToFahrenheit);

searchCity("San Francisco");
