    let userNameField = document.getElementById(`username`);
    let repoField = document.getElementById(`repo`);
    let ulEl = document.getElementById(`commits`);
 
 
function getUrl(username,repo) {
    let url = `https://api.github.com/repos/${username}/${repo}/commits`
    return url;
}
 
function catchError(error) {
    ulEl.textContent = `Error: ${error.status} (${error.message})`;
    return;
}
 
function loadCommits() {
    
 
    ulEl.innerHTML = ``;
 
    fetch(getUrl(userNameField.value,repoField.value))
    .then(response=> response.json())
    .then(data=>{
        Object.entries(data).forEach(el=>{
            let li = document.createElement(`li`);
            li.textContent = `${el[1].commit.author.name} : ${el[1].commit.message}`;
            ulEl.appendChild(li);
        })
    })
    .catch(catchError);
}