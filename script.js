
  var userFormEl = document.querySelector('#user-form');
  var languageButtonsEl = document.querySelector('#language-buttons');
  var containerEl = document.querySelector('#container');
  var citySearchTerm = document.querySelector('#city-search-term');
  var APIKey = 'e35212b7055d130adb915956a5189fce';
  var city= document.querySelector('#city');
  var currentPicEl = document.getElementById("current-pic");
  var currentTempEl = document.getElementById("temperature");
  var currentHumidityEl = document.getElementById("humidity");
  var currentWindEl = document.getElementById("wind-speed");
  var currentUVEl = document.getElementById("UV-index");
 


var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityInput = city.value.trim();

  if (cityInput) {
    getCurrentWeather(cityInput);
    // containerEl.textContent = '';
    city.value = '';
  } else {
    alert('Please enter a city');
  }
};


var getCurrentWeather = async function (city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  await fetch(queryURL)
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
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      var myString = "Hello JUliet";
      let uvidata = getUviData(lat, lon);
      displayWeathertoPage(data, uvidata, myString);
    })
 
};

var displayWeathertoPage = function (dataObject, param2, param3) {
  // assign variables to the values of the object's properties
  console.log(param3);
  var temp = dataObject.main.temp;
  var humidity = dataObject.main.humidity;
  var windspeed = dataObject.wind.speed;
  // var uvi = null;
  currentTempEl.textContent = temp;
  currentHumidityEl.textContent=humidity;
  currentWindEl.textContent=windspeed;
  currentUVEl.textContent=param2;
  // if (city.length === 0) {
  //   containerEl.textContent = 'No weather found.';
   
  //   return;
  // }
    
};

async function getUviData (lat, lon) {
  let uvidata = null;
  var uviURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    await fetch(uviURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          alert('Error:' + response.statusText);
        }
      })
      .then(function (data) {
        uvidata=data.current.uvi;

      })
      return uvidata;
};

var displayUVItoPage = function (dataObject) {
  var lat = dataObject.coord.lat;
  var lon = dataObject.coord.lon;
  currentUVEl.textContent='';
};

userFormEl.addEventListener('submit', formSubmitHandler);



