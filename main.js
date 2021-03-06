const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c0f1c0571c03dffda8ff23bc896915b8&page=1';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280/';

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=c0f1c0571c03dffda8ff23bc896915b8&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const input = document.getElementById('input');

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);
    showMovie(respData.results);
}

function showMovie(movies) {
    main.innerHTML = "";

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl);
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    } else if(vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


form.addEventListener('submit', e => {
    e.preventDefault();

    const inputValue = input.value;

    if(inputValue) {
        getMovies(SEARCHAPI + inputValue);

        input.value = '';
    }
})