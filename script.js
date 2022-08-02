function initPage() {}
  const userFormEl = document.querySelector('#user-form');
  const languageButtonsEl = document.querySelector('#language-buttons');
// var nameInputEl = document.querySelector('#username');
  const repoContainerEl = document.querySelector('#repos-container');
  const repoSearchTerm = document.querySelector('#repo-search-term');
  const APIKey = 'e35212b7055d130adb915956a5189fce';
  const city= document.querySelector('#username');
  const currentPicEl = document.getElementById("current-pic");
  const currentTempEl = document.getElementById("#temperature");
  const currentHumidityEl = document.getElementById("#humidity");
  const currentWindEl = document.getElementById("wind-speed");
  const currentUVEl = document.getElementById("UV-index");
  const historyEl = document.getElementById("history");
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  // console.log(searchHistory);
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = city.value.trim();

  if (username) {
    getUserRepos(username);

    repoContainerEl.textContent = '';
    city.value = '';
  } else {
    alert('Please enter a city');
  }
};


// var buttonClickHandler = function (event) {
//   // What is `event.target` referencing?
//   // TODO: Write your answer here
//   //targeting buttons
//   var language = event.target.getAttribute('data-language');

//   // Why is this `if` block in place?
//   // TODO: Write your answer here
//   //grabbing different languages depending on the one picked.
//   if (language) {
//     getFeaturedRepos(language);

//     repoContainerEl.textContent = '';
//   }
// };

var getUserRepos = function (city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to One Weather');
    });
};

// var getFeaturedRepos = function (language) {
//   // What are the query parameters doing here?
//   // TODO: Write your answer here
//   //depending on language, listing out issues.
//   var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayRepos(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };

var displayRepos = function (sCity, searchTerm) {
  console.log(sCity);
  if (sCity.length === 0) {
    repoContainerEl.textContent = 'No weather found.';
    // What would happen if there was no `return;` here?
    // TODO: Write your answer here
    //Ends function if no repositories.
    return;
  }

  // repoSearchTerm.textContent = searchTerm;
console.log('sCity');
  // for (var i = 0; i < sCity.length; i++) {
    // What is the result of this string concatenation?
    // TODO: Write your answer here
    // Making new URL.
    // var repoName = repos[i].owner.login + '/' + repos[i].name;
// console.log(sCity[i]);
    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    repoContainerEl.textContent = sCity.main.temp;
    
    var humidity = document.createElement('span');
    currentHumidityEl.textContent = sCity.main.humidity;
   

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    // if (repos[i].open_issues_count > 0) {
    //   statusEl.innerHTML =
    //     "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    // } else {
    //   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    // }

    currentHumidityEl.appendChild(humidity);
    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  // }
};

userFormEl.addEventListener('submit', formSubmitHandler);
// languageButtonsEl.addEventListener('click', buttonClickHandler);
initPage();
