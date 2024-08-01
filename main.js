// connexion à l'API
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWU4MjY5MzkxNWM0MjkyYWQzYzZkYmQwYTIwOGYwNCIsIm5iZiI6MTcyMjI0ODMzNS4yMTA2MjQsInN1YiI6IjY2YTc2NWRiNzZlNTJjODY0MDNhNDAyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryYOaPsrZLJmv_u060JOPOHHQjnOxaU-JK4AibGhlbA'
    }
};

// recherche dans l'API à partir d'un input
let input = document.querySelector('input')
let matches = document.querySelector('#movieMatches');
input.addEventListener('search', async () => {
    console.log(`input = ${input.value}`);
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1`, options);
    const data = await response.json();

// version pour accéder à toutes les pages: 
//     let data = {};
//     data['results'] = [];
//     for (let i = 1; i <= 500; i++){
//         let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=${i}`, options);
//         let singlePageData = await response.json();
//         if (singlePageData.results.length === 0){
//             break;
//         } 
//         else {
//             for (let i = 0; i < singlePageData.results.length; i++){    
//                 if (singlePageData.results[i] === 0){
//                     break;
//                 }
//                 else {
//                     data['results'].push(singlePageData.results[i]);
//                 };
//             };
//             console.log(data);
//         };
//     };

        // affichage dynamique des résultats (avec récupération des informations à utiliser)
    if (matches.innerHTML != null) {
        matches.innerHTML = null;
    };
    for (let i = 0; i < data.results.length; i++){
        console.log(i)
        let movieId = data.results[i].id;
        let releaseYear = data.results[i].release_date.split('-')[0];
            
        // récupération de la première image de chaque film (à peut-être déplacer en dehors de la boucle ?)
        let imageResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, options);
        let imageData = await imageResponse.json();
        console.log(imageData)
        let backdrop;
        if (imageData.posters.length > 0){
            backdrop = imageData.posters[0].file_path;
        }
        else {
            break;
        };


        let movieMatch = document.createElement('div');
        movieMatch.classList.add('match');
        movieMatch.setAttribute('id', `movie${movieId}`)  
        
        let matchTitle = document.createElement('p');
        matchTitle.classList.add('thumbnailTitle');
        if (!data.results[i].release_date){
            matchTitle.innerHTML = `${data.results[i].title}`;
        }
        else {
            matchTitle.innerHTML = `${data.results[i].title} - ${releaseYear}<br/>`;
        }; 
        

        let matchImg = document.createElement('img');
        matchImg.classList.add('thumbnailImage')
        matchImg.setAttribute('style', `background-image: url('https://image.tmdb.org/t/p/original${backdrop})`)

        
        movieMatch.appendChild(matchImg);
        movieMatch.appendChild(matchTitle);
        matches.appendChild(movieMatch); 

    };
});