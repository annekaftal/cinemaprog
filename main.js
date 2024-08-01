// connexion à l'API
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWU4MjY5MzkxNWM0MjkyYWQzYzZkYmQwYTIwOGYwNCIsIm5iZiI6MTcyMjI0ODMzNS4yMTA2MjQsInN1YiI6IjY2YTc2NWRiNzZlNTJjODY0MDNhNDAyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryYOaPsrZLJmv_u060JOPOHHQjnOxaU-JK4AibGhlbA'
    }
};

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

// affichage dynamique des résultats (avec récupération des informations à utiliser)
const displayMatches = async () => {
    console.log(`input = ${input.value}`);
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1`, options);
    const data = await response.json();
    console.log(data);


    if (matches.innerHTML != null) {
        matches.innerHTML = null;
    };
    for (let i = 0; i < data.results.length; i++){
        console.log(i)
        let movieId = data.results[i].id;
        let releaseYear = data.results[i].release_date.split('-')[0];
        
        let backdrop;
        if (data.results[i].poster_path){
            backdrop = `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`;
        }
        else {
            backdrop = 'https://critics.io/img/movies/poster-placeholder.png';
        };


        let movieMatch = document.createElement('div');
        movieMatch.classList.add('match');
        movieMatch.setAttribute('id', `${movieId}`)  
        
        let matchTitle = document.createElement('p');
        matchTitle.classList.add('thumbnailTitle');
        if (!data.results[i].release_date){
            matchTitle.innerHTML = `${data.results[i].title}`;
        }
        else {
            matchTitle.innerHTML = `${data.results[i].title} - ${releaseYear}<br/>`;
        }; 
        

        let matchImg = document.createElement('img');
        matchImg.classList.add('thumbnailImage');
        matchImg.setAttribute('style', `background-image: url(${backdrop})`);

        
        movieMatch.appendChild(matchImg);
        movieMatch.appendChild(matchTitle);
        matches.appendChild(movieMatch);  
        
        const preview = document.querySelector('#imgPreview');
        movieMatch.addEventListener('click', async () => {
            let selectedId = movieMatch.getAttribute('id');
            console.log(`ID = ${selectedId}`);
            matches.innerHTML = null;

            if (preview.innerHTML != null){
                preview.innerHTML = null;
            }
            
            const imgResponse = await fetch (`https://api.themoviedb.org/3/movie/${selectedId}/images`, options);
            const imgData = await imgResponse.json();

            for (let i = 0; i < imgData.backdrops.length; i++){
                let backdropPreview = document.createElement('img')
                backdropPreview.classList.add('previewImage');
                backdropPreview.setAttribute('style', `background-image: url('https://image.tmdb.org/t/p/original${imgData.backdrops[i].file_path}')`);
                preview.appendChild(backdropPreview);
            }

            

        })

    };
};


// recherche dans l'API à partir d'un input
let input = document.querySelector('input')
let matches = document.querySelector('#movieMatches');
input.addEventListener('keyup', debounce(displayMatches, 300));