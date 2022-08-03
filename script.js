function initPage() {}
  const userFormEl = document.querySelector('#user-form');
  const languageButtonsEl = document.querySelector('#language-buttons');
// var nameInputEl = document.querySelector('#username');
  const containerEl = document.querySelector('#container');
  const citySearchTerm = document.querySelector('#city-search-term');
  const APIKey = 'e35212b7055d130adb915956a5189fce';
  const city= document.querySelector('#city');
  const currentPicEl = document.getElementById("current-pic");
  const currentTempEl = document.getElementById("#temperature");
  const currentHumidityEl = document.getElementById("#humidity");
  const currentWindEl = document.getElementById("wind-speed");
  const currentUVEl = document.getElementById("UV-index");
  const historyEl = document.getElementById("history");
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
 



var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityInput = city.value.trim();

  if (cityInput) {
    getCurrentWeather(cityInput);
    containerEl.textContent = '';
    city.value = '';
  } else {
    alert('Please enter a city');
  }
};



var getCurrentWeather = function (city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        console.log('response object is', response);
        return response.json();
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .then(function (data) {
      console.log('data object is', data);
      displayWeathertoPage(data);
      // run aother function i.e. getUviData to fetch the UVI information
      // getUviData(data.lat, data.long)
    })
    // .catch(function (error) {
    //   alert('Unable to connect to One Weather');
    // });
};

function getUviData (lat, long) {
  // fetch the UVI information at another endpoint data/2.5/
}


var displayWeathertoPage = function (dataObject) {
  // assign variables to the values of the object's properties
  var temp = dataObject.main.temp;
  var humidity = dataObject.main.humidity;
  var windspeed = dataObject.wind.speed;
  // var uvi = null;
  currentTempEl.textContent=temp;
  currentHumidityEl.textContent=humidity;
  currentWindEl.textContent=windspeed;

  console.log(temp);
  if (city.length === 0) {
    containerEl.textContent = 'No weather found.';
   
    return;
  }
  
   
    currentHumidityEl.appendChild(humidity);
    


};

userFormEl.addEventListener('submit', formSubmitHandler);


initPage();
