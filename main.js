const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWU4MjY5MzkxNWM0MjkyYWQzYzZkYmQwYTIwOGYwNCIsIm5iZiI6MTcyMjI0ODMzNS4yMTA2MjQsInN1YiI6IjY2YTc2NWRiNzZlNTJjODY0MDNhNDAyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ryYOaPsrZLJmv_u060JOPOHHQjnOxaU-JK4AibGhlbA'
    }
  };

const getData = async () => {
    const response = await fetch('https://api.themoviedb.org/3/search/movie?query=almost+famous&include_adult=false&language=en-US&page=1', options);
    const data = await response.json();
    console.log(data.results[0]);
    document.querySelector("#displayMovie").innerHTML = `${data.results[0].original_title}, ${data.results[0].release_date}.`;
};

getData();