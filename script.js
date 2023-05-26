const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const title = document.getElementById("moviesAppTitle")

title.addEventListener('click', refresh)

function refresh(){
    window.location.reload();
}

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  //Get the movies from the api and convert them to json
  const res = await fetch(url);
  const data = await res.json();

  //Call showMovies with the fetched movie data
  showMovies(data.results);
}

function showMovies(movies) {
  //Reset main
  main.innerHTML = "";

  //For each movie create a movie card
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;
    main.appendChild(movieEl);
  });
}

//Depending on the rating, the color will change
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

//Searchbar
form.addEventListener("submit", (e) => {
  //Prevent the reloading of the page on search
  e.preventDefault();

  const searchTerm = search.value;

  //If there is something to search and it's different than ''
  if (searchTerm && searchTerm !== "") {
    //Call getMovies with the searchAPI and whatever was on the searchbar
    getMovies(SEARCH_API + searchTerm);

    //Reset the searchbar
    search.value = "";
  } else {
    //If the searchbar is empty refresh the page
    refresh();
  }
});
