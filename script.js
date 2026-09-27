const repoList = document.getElementById('repo-list');

async function fetchRepositories() {
  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error('Could not fetch repositories.');
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    repoList.innerHTML = '<li class="error">Unable to load starred repositories.</li>';
    console.error(error);
  }
}

function renderRepositories(repositories) {
  repoList.innerHTML = repositories
    .map(
      (repo) => `
        <li class="repo-item">
          <a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a>
          <p>${repo.description || 'No description provided.'}</p>
          <div class="meta">
            <span>${repo.language || 'Unknown'}</span>
            <span>⭐ ${repo.stars}</span>
          </div>
        </li>
      `
    )
    .join('');
}

fetchRepositories();
