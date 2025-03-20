//fetch API 
fetch('http://api.openweathermap.org/data/2.5/forecast?lat=-32.9468&lon=-60.6393&appid=fca0ae130e4059093aa3a8901b2f4934')
  .then(response => response.json())
  //.then(data => console.log(data))
  .then(data => displayWeather(data))

  .catch(error => {
    console.error('An error occurred:', error);
  });

// Get elements
let temperature = document.getElementById('temperature');
let weatherDescription = document.getElementById('weatherDescription');
let highTemp = document.getElementById('highTemp');
let lowTemp = document.getElementById('lowTemp');
let humidity = document.getElementById('humidity');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');
let forecastIcon = document.getElementById('forecastIcon');
let today = document.getElementById('today');
let tomorrow = document.getElementById('tomorrow');
let afterTomorrow = document.getElementById('afterTomorrow');

// Display weather data
function displayWeather(data) {
  if (data && data.list &&data.city) {

    const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    const todayForecast = forecast[0];
    const tomorrowForecast = forecast[1];
    const afterTomorrowForecast = forecast[2];

    const kelvinToCelsius = (kelvin) => Math.round((kelvin - 273.15) * 10) / 10;

    const tempCelsius = kelvinToCelsius(todayForecast.main.temp);
    const tempCelTom = kelvinToCelsius(tomorrowForecast.main.temp);
    const tempCelAftTom = kelvinToCelsius(afterTomorrowForecast.main.temp);
    const tempMax = kelvinToCelsius(todayForecast.main.temp_max);
    const tempMin = kelvinToCelsius(todayForecast.main.temp_min);

    const weatherDesc = todayForecast.weather[0].description;
    const humidityValue = todayForecast.main.humidity;
    const icon = todayForecast.weather[0].icon;

    const sunriseValue = new Date(data.city.sunrise * 1000).toLocaleTimeString();
    const sunsetValue = new Date(data.city.sunset * 1000).toLocaleTimeString();

    temperature.innerHTML = tempCelsius + ' °C';
    highTemp.innerHTML = tempMax + ' °C';
    lowTemp.innerHTML = tempMin + ' °C';
    weatherDescription.innerHTML = weatherDesc;
    humidity.innerHTML = humidityValue + '%';
    sunrise.innerHTML = sunriseValue;
    sunset.innerHTML = sunsetValue;
    forecastIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    today.innerHTML = tempCelsius + ' °C';
    tomorrow.innerHTML = tempCelTom + ' °C';
    afterTomorrow.innerHTML = tempCelAftTom + ' °C';
  } else {
    temperature.innerHTML = 'Unable to retrieve temperature data.';
  }
}

