function loadRepos() {
  const username = document.getElementById('username').value;
  fetch(`https://api.github.com/users/${username}/repos`)
     .then(handleRepos)
     .then(handleData)
     .catch(handleError)
}
function handleRepos(response) {
  if (response.ok == false) {
     throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
function handleData(data) {
  const list = document.getElementById('repos');
  if (list.textContent != '') {
     list.textContent = '';
  }

  for (let repo of data) {
     const li = document.createElement('li');
     const a = document.createElement('a');
     a.href = repo.html_url;
     a.textContent = repo.full_name;
     li.appendChild(a);
     list.appendChild(li);
  }
}
function handleError(err) {
  const list = document.getElementById('repos');
  list.textContent = err.message;
}