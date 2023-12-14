const form = document.querySelector('form')
const input = document.querySelector('input')
const titleText = document.getElementById('titleText')
const dateText = document.getElementById('dateText')
const idText = document.getElementById('idText')
const overviewText = document.getElementById('overviewText')
const moviePoster = document.getElementById('moviePoster')
const movieBg = document.getElementById('movieBg')
const movieInfo = document.getElementById('movie-info')
const similarMovies = document.getElementById('similarMovies')
const movieLink = document.getElementById('movieLink')
const recMovies = document.getElementById('recMovies')

form.addEventListener('submit', (e) => {
    e.preventDefault()
})

input.addEventListener('keyup', (e) => {
    const mainUrl = 'http://localhost:3000/title?title=' + input.value;

    if(input.value === '') {
        titleText.innerHTML = '';
        dateText.innerHTML = '';
        idText.innerHTML = '';
        overviewText.innerHTML = '';
        moviePoster.src = '';
        movieBg.style.backgroundImage = `url('')`

    }

    fetch(mainUrl).then((response) => {
        response.json().then((data) => {
            similarMovies.innerHTML = '';
            if(data.error) {
                return data.error
            }

            titleText.innerHTML = data.title;
            dateText.innerHTML = data.release_date;
            if(data.id === '') {
                idText.innerHTML = ``;
            } else {
                idText.innerHTML = `ID: ${data.id}`;
            }
            overviewText.innerHTML = data.overview;
            movieLink.setAttribute('href', data.movie_link)
            moviePoster.src = data.poster_path;
            if(data.backdrop_path.includes('null')) {
                movieBg.style.backgroundImage = `url('${data.poster_path}')`
            } else {
                movieBg.style.backgroundImage = `url('${data.backdrop_path}')`;
            }
            movieBg.style.backgroundRepeat = 'no-repeat center'
            movieBg.style.backgroundPosition = 'center'
            movieBg.style.backgroundSize = 'cover'
            movieBg.style.filter = 'blur(10px) brightness(60%)'
            movieBg.style.animation = 'fade-in 2s forwards'
            movieInfo.style.animation = 'fade-in 2s forwards'

            data.similarMovies.forEach(movie => {
                let newMovie = document.createElement('li')
                newMovie.innerHTML = `
                    <div class="movieCard">
                        <img src='${movie.backdrop_path}' alt='${movie.title}''>
                        <div class='movieInfo'>
                            <div>
                            <h1>${movie.title}</h1>
                            </div>
                            <p>${movie.overview}</p>
                        </div>
                    </div>
                    <a href=https://www.themoviedb.org/movie/${movie.id}-avatar?language=en-US target='_blank'>
                        <div class='movieLinkTab'>
                            <p>Go To Movie &rarr;</p>
                        </div>
                    </a>
                `;
                similarMovies.appendChild(newMovie);
            })
        })
    })
})
