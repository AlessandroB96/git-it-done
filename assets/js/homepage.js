
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
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
    });
};

getUserRepos("AlessandroB96");

//note: if you use .json() method, and the API returns non-json data, then use text() instead