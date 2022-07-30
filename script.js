var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
// var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var APIKey = 'e35212b7055d130adb915956a5189fce';
var city= document.querySelector('#username');
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

var getUserRepos = function (user) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
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

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No weather found.';
    // What would happen if there was no `return;` here?
    // TODO: Write your answer here
    //Ends function if no repositories.
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    // What is the result of this string concatenation?
    // TODO: Write your answer here
    // Making new URL.
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
// languageButtonsEl.addEventListener('click', buttonClickHandler);

