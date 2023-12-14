const fetch = require('node-fetch')
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const getMovie = require('./utils/getMovie')
const getSimilar = require('./utils/similar')

const app = express();

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        test: 'sup'
    })
})

app.get('/title', async (req, res) => {
    const title = req.query.title

    if(!req.query.title) {
        return res.send({
            error: 'must provide movie title'
        })
    }

    getMovie(title).then(movie => {
        if(movie === undefined) {
            return res.send({
                title: 'No movie found',
                id: '',
                release_date: '',
                overview: '',
                poster_path: '',
                backdrop_path: ''
            })
        }
        getSimilar(movie[0].id).then(movies => {
            const similarMovies = []
            movies.forEach(movie => {
                similarMovies.push({
                    title: movie.original_title,
                    id: movie.id,
                    release_date: movie.release_date,
                    overview: movie.overview,
                    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/' + movie.poster_path,
                    backdrop_path: 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + movie.backdrop_path,
                    movie_link: 'https://www.themoviedb.org/movie/' + movie.id
                })
            })

            res.send({
                title: movie[0].movie_title,
                id: movie[0].id,
                release_date: movie[0].release_date,
                overview: movie[0].overview,
                poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/' + movie[0].poster_path,
                backdrop_path: 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + movie[0].backdrop_path,
                movie_link: 'https://www.themoviedb.org/movie/' + movie[0].id,
                similarMovies: similarMovies
            })
        })
    })
})

app.listen(3000, (error) => {
    if(error) {
        return {error: error}
    }

    console.log('server is on port 3000')
})