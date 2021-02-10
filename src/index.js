//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00
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


let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatDate(now);

let dateNow = document.querySelector("#date-now");
dateNow.innerHTML = displayDay(new Date());


//🕵️‍♀️Feature #2
//Add a search engine, when searching for a city (i.e. Paris), 
//display the city name on the page after the user submits the form.
function defaultLocationWeather(response){
   let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = temperature;
  let description = response.data.weather[0].main;
  let descr = document.querySelector("#description");
  descr.innerHTML = description;
  let wind = Math.round(response.data.wind.speed)
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${wind} km/h`;
}

function showCurrentLocationWeather(){

  navigator.geolocation.getCurrentPosition(showPosition);
  
}

function localWeather(response){
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = temperature;
  let description = response.data.weather[0].main;
  let descr = document.querySelector("#description");
  descr.innerHTML = description;
  let wind = Math.round(response.data.wind.speed)
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${wind} km/h`;
}

function showPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "444dec86065a0dffc920fcea9a0aef12";
    let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(localWeather);
}


function displayWeather(response){
   let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = temperature;
  let description = response.data.weather[0].main;
  let descr = document.querySelector("#description");
  descr.innerHTML = description;
  let wind = Math.round(response.data.wind.speed)
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${wind} km/h`;

}

function search(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let apiKey = "444dec86065a0dffc920fcea9a0aef12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}
  &appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}



let apiKey = "444dec86065a0dffc920fcea9a0aef12";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York
&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(defaultLocationWeather);

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", search);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", showCurrentLocationWeather);


//🙀Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. 
//When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, 
//it should convert it back to Celsius.

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

 let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
 let celsiusUnit = document.querySelector("#celsius-unit");


 celsiusUnit.addEventListener("click", changeToCelsius);
 fahrenheitUnit.addEventListener("click", changeToFahrenheit);

 