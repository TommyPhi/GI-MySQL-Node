const fetch = require('node-fetch');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGExNDBkYjhhNTEwN2NmYjE0YTNhMmJkMmQ5YjJmYSIsInN1YiI6IjY1NzczNDBhOTQ1MWU3MGZlYjAxZDdhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OsgdFm7nHWhcCfZapnJNoGNH06o27o3YO4NZMzdIEMA'
  }
};

async function getSimilar(movieID) {
    const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/similar?language=en-US&page=1';
    return fetch(url, options)
        .then(res => res.json())
        .then(json => json.results)
        .catch(err => console.error('error:' + err));
}

module.exports = getSimilar