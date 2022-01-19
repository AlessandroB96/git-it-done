var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    console.log(repo);



    //github api documentation endpoint 
    // /repos/{owner}/{repo}/issues
    
    //query direction in ascending order since default is decending
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        //request was successful 
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data); 
            });
        }
        else {
            alert("There was a problem with your request!");
        }
      
    })
};
   getRepoIssues("facebook/react");


//Convert Fetched Data into DOM Elements 

var displayIssues = function(issues) {
if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
}
    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);     //issue objects have an html_url property which links to the full issue on Github 
        //NOTE: if you are unsure what property to add after issue[i], go to your dev tools on chrome, click the network tab, open each array index and scroll down to what we desire, in our case the "html_url" property gives us exactly the url for that specific issue, as you can see there
        issueEl.setAttribute("target", "_blank");           //opens the link in a new tab instead of replacing current webpage

        //create span to hold issue title
        var titleEl = document.createElement("span");

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element 
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //append to container 
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}


