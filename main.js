// ralentissement de l'affichage
function debounce (f, ms) {
    let timeout;
    return function () {
        if (timeout){
            clearTimeout(timeout);
        };
        timeout = setTimeout(() => {
            f();
        }, ms);
    }
}


// récupération d'un json à partir d'un input
const getData = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1`, options);
    const jsonResponse = await response.json();
    return jsonResponse;
}


// réinitialisation du contenu d'un élément HTML (searchbar, preview, etc.)
function clearSection(section){
    if (section.innerHTML != null) {
        section.innerHTML = null;
    }
}


// affichage d'images dans le preview à partir des résultats de requête
function displayPreview (images) {
    for (let i = 0; i < images.backdrops.length; i++){
        let backdropPreview = document.createElement('img')
        backdropPreview.classList.add('previewImage');
        backdropPreview.setAttribute('style', `background-image: url('https://image.tmdb.org/t/p/original${images.backdrops[i].file_path}')`);
        preview.appendChild(backdropPreview);
    }
}


// affichage des résultats dans la barre de recherche
function displayMatches (id, title, year, poster) {
    let match = document.createElement('div');
    match.classList.add('match');
    match.setAttribute('id', `${id}`)  
    
    let matchTitle = document.createElement('p');
    matchTitle.classList.add('thumbnailTitle');
    
    if (!year){
        matchTitle.innerHTML = `${title}`;
    }
    else {
        matchTitle.innerHTML = `${title} - ${year}<br/>`;
    }

    let matchImg = document.createElement('img');
    matchImg.classList.add('thumbnailImage');
    matchImg.setAttribute('style', `background-image: url(${poster})`);

    
    match.appendChild(matchImg);
    match.appendChild(matchTitle);
    matches.appendChild(match);

    match.addEventListener('click', async () => {
        let selectedId = match.getAttribute('id');
        clearSection(matches);
        clearSection(preview);
        const imgResponse = await fetch (`https://api.themoviedb.org/3/movie/${selectedId}/images`, options);
        const imgData = await imgResponse.json();
        displayPreview(imgData);
    });
}


// extraction d'informations à partir des résultats de requête
function getMatches (movieData) {
    
    let movieId;
    let movieYear;
    let moviePoster;
    
    clearSection(matches);
    
    for (let i = 0; i < movieData.results.length; i++){
        console.log(i)
        movieId = movieData.results[i].id;
        movieTitle = movieData.results[i].title;
        movieYear = movieData.results[i].release_date.split('-')[0];
        
        if (movieData.results[i].poster_path){
            moviePoster = `https://image.tmdb.org/t/p/original${movieData.results[i].poster_path}`;
        }
        else {
            moviePoster = 'https://critics.io/img/movies/poster-placeholder.png';
        }
        displayMatches(movieId,movieTitle, movieYear, moviePoster);
    }
}


// affichage dynamique des résultats (avec récupération des informations à utiliser)
const addFilm = async () => {
    let data = await getData();
    getMatches(data);
}


// connexion à l'API
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWU4MjY5MzkxNWM0MjkyYWQzYzZkYmQwYTIwOGYwNCIsIm5iZiI6MTcyMjI0ODMzNS4yMTA2MjQsInN1YiI6IjY2YTc2NWRiNzZlNTJjODY0MDNhNDAyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryYOaPsrZLJmv_u060JOPOHHQjnOxaU-JK4AibGhlbA'
    }
}


// récupération des éléments du DOM
let matches = document.querySelector('#movieMatches');
let preview = document.querySelector('#imgPreview');
let collage = document.querySelector('#collage');
let input = document.querySelector('input');


// recherche dans l'API à partir d'un input utilisateur
input.addEventListener('keyup', debounce(addFilm, 300));   