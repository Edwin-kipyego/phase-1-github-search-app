document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchQuery = document.getElementById("search").value;
      searchUsers(searchQuery);
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          displayUsers(data.items);
        });
    }
  
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous results
      reposList.innerHTML = ""; // Clear repos list
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button data-username="${user.login}">View Repos</button>
        `;
        li.querySelector("button").addEventListener("click", () => {
          fetchUserRepos(user.login);
        });
        userList.appendChild(li);
      });
    }
  
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((repos) => {
          displayRepos(repos);
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = ""; // Clear previous results
      repos.forEach((repo) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(li);
      });
    }
  });