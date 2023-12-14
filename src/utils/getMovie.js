const fetch = require('node-fetch');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGExNDBkYjhhNTEwN2NmYjE0YTNhMmJkMmQ5YjJmYSIsInN1YiI6IjY1NzczNDBhOTQ1MWU3MGZlYjAxZDdhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OsgdFm7nHWhcCfZapnJNoGNH06o27o3YO4NZMzdIEMA'
  }
};

async function getMovie(title) {
    const url = 'https://api.themoviedb.org/3/search/movie?query='+ title + '&include_adult=false&language=en-US&page=1';
    return fetch(url, options)
        .then(res => res.json())
        .then(json => [{
            movie_title: json.results[0].original_title,
            id: json.results[0].id,
            release_date: json.results[0].release_date,
            overview: json.results[0].overview,
            poster_path: json.results[0].poster_path,
            backdrop_path: json.results[0].backdrop_path,
        }])
        .catch(err => console.error('error:' + err));
}

module.exports = getMovie
