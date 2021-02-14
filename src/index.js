let now = new Date();

function formatDate(currentDate){
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[currentDate.getDay()];

let hours = currentDate.getHours();
if (hours<10){
  hours = `0${hours}`;
}

let minutes =currentDate.getMinutes();
if (minutes<10){
  minutes = `0${minutes}`;
}

let date = `${day}, ${hours}:${minutes}`;
return date;
}


function displayDay(currentDay){
  let day = currentDay.getDate();
  if (day<10){
  day = `0${day}`;
}
  months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  let month = months[currentDay.getMonth()];
  
  let dayAndMonth = `${day}/${month}`;
  return dayAndMonth;
}

function displayWeather(response){
  
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
 
}


function showPosition(position){
    let apiKey = "444dec86065a0dffc920fcea9a0aef12";
    let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
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
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

 function changeToCelsius(event){
   event.preventDefault();
   let temperature = document.querySelector("#temperature-value");
   temperature.innerHTML = Math.round((temperature.innerHTML - 32) * 5/9);
 }

 function changeToFahrenheit(event){
   event.preventDefault();
         let temperature = document.querySelector("#temperature-value");
     temperature.innerHTML = Math.round(temperature.innerHTML*9/5+32);
 }


let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", showCurrentLocationWeather);

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatDate(now);

let dateNow = document.querySelector("#date-now");
dateNow.innerHTML = displayDay(new Date());


let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
let celsiusUnit = document.querySelector("#celsius-unit");

celsiusUnit.addEventListener("click", changeToCelsius);
fahrenheitUnit.addEventListener("click", changeToFahrenheit);

searchCity("New York");
 