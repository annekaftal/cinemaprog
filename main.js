const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWU4MjY5MzkxNWM0MjkyYWQzYzZkYmQwYTIwOGYwNCIsIm5iZiI6MTcyMjI0ODMzNS4yMTA2MjQsInN1YiI6IjY2YTc2NWRiNzZlNTJjODY0MDNhNDAyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryYOaPsrZLJmv_u060JOPOHHQjnOxaU-JK4AibGhlbA'
    }
};


let input = document.querySelector('input')
let matches = document.querySelector('#movieMatches');
input.addEventListener('input', async () => {
    console.log(`input = ${input.value}`);
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1`, options);
    const data = await response.json();
    if (matches.innerHTML != null) {
        matches.innerHTML = null;
    };
    for (let i = 0; i < data.results.length; i++){
        let movieMatch = document.createElement('div');
        movieMatch.classList.add('match');
        movieMatch.setAttribute('id', `movie${data.results[i].id}`)
        movieMatch.innerHTML = `${data.results[i].original_title}, ${data.results[i].release_date}<br/>`;
        matches.appendChild(movieMatch); 
    };
});