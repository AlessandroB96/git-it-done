
/* var getUserRepos = function () {
    fetch("https://api.github.com/users/octocat/repos").then(function(response) {
  console.log("inside", response);
});

console.log("outside"); */

//note: when we consol.log response, we get a return of "promise". Once we fetch data from an API and we are promised it i guess, we can use the then() method when the promise has been fulfilled


//note: console.log("outside") will print first. Why? becuase API's are asyncronous, meaning if an API takes too long to fetch data, javascript runs the rest of the code and displays the fetched API once it's ready

//if we check console.log for response, the url tells us where the response came from.
        //A stutus value of 200 as displayed, means that it is a success and the request went through successfully





var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
          
    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
        if(response.ok) {                      //if the API gives us a valid response 
        response.json().then(function(data) {
            displayRepos(data, user);
        });
        } else {               //if API returns 404 error or no user found
            alert("error: GitHub User Not Found");
        }
    })

    //.catch is built into the fetch API that can help us catch connectivity issues. notice it is chained to the end of .then() method
    //if the request to the API returns successful, it will trigger .then(). If it fails, it will trigger catch()
    .catch(function() {
        alert("unable to connect to GitHub");
    })
};



//note: if you use .json() method, and the API returns non-json data, then use text() instead


//--------------------------------------------

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

let formSubmitHandler = function(event) {
    event.preventDefault();       //we see this again, good practice to write this when we submit forms so the whole page doesnt automatically refresh
    
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
      } else {
        alert("Please enter a GitHub username");
      }
    console.log(event);
}

userFormEl.addEventListener("submit", formSubmitHandler);



//recieving data 
 var displayRepos = function (repos , searchTerm) {

    //if api returns any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
     console.log(repos);
     console.log(searchTerm);

    //clear old content. To make it look professional
     repoContainerEl.textContent = "";
     repoSearchTerm.textContent = searchTerm;


     // loop over repos
    for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;
  
    // create a container for each repo
    //we later changed this from a "div" to a "a" element so we can click on each repo to link it to a new page with issues
    //create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href","./single-repo.html?repo=" + repoName);
  
    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
  
    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
    statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    // append to container
    repoEl.appendChild(titleEl);

    // append to container
    repoEl.appendChild(statusEl);

    
  
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
 };