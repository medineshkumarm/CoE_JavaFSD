"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "ec4972a5";
let currentMovieId = "";
// Initial load
document.addEventListener("DOMContentLoaded", () => {
    fetchMovies("Avengers"); // Default trending movies
});
function fetchMovies(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
            const data = yield response.json();
            displayMovies(data.Search);
        }
        catch (error) {
            console.error("Error fetching movies:", error);
        }
    });
}
function displayMovies(movies) {
    const grid = document.getElementById("trendingMovies");
    grid.innerHTML = "";
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
              <img src="${movie.Poster}" class="movie-poster" alt="${movie.Title}">
              <div class="movie-info">
                  <h3>${movie.Title}</h3>
                  <p>${movie.Year}</p>
              </div>
          `;
        movieCard.addEventListener("click", () => showMovieDetails(movie.imdbID));
        grid.appendChild(movieCard);
    });
}
function showMovieDetails(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        currentMovieId = movieId;
        const response = yield fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`);
        const movie = yield response.json();
        document.getElementById("home").style.display = "none";
        document.getElementById("movieDetails").style.display = "block";
        document.getElementById("reviews").style.display = "none";
        document.getElementById("movieTitle").textContent = movie.Title;
        document.getElementById("moviePoster").src = movie.Poster;
        document.getElementById("movieYear").textContent = `Year: ${movie.Year}`;
        document.getElementById("movieRating").textContent = `IMDB Rating: ${movie.imdbRating}`;
        document.getElementById("moviePlot").textContent = movie.Plot;
        document.getElementById("movieId").value = movieId;
    });
}
function searchMovies() {
    const searchTerm = document.getElementById("searchInput").value;
    fetchMovies(searchTerm);
}
function showSection(sectionId) {
    document.getElementById("home").style.display = "none";
    document.getElementById("movieDetails").style.display = "none";
    document.getElementById("reviews").style.display = "none";
    document.getElementById(sectionId).style.display = "block";
    if (sectionId === "reviews") {
        displayAllReviews();
    }
}
// Review System
document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const review = {
        movieId: currentMovieId,
        rating: document.getElementById("rating").value,
        name: document.getElementById("reviewerName").value,
        comment: document.getElementById("reviewComment").value,
        date: new Date().toLocaleString(),
    };
    saveReview(review);
    alert("Review submitted successfully!");
    document.getElementById("reviewForm").reset();
});
function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}
function displayAllReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const reviewsList = document.getElementById("allReviews");
    reviewsList.innerHTML = "";
    const grouped = reviews.reduce((acc, review) => {
        acc[review.movieId] = acc[review.movieId] || [];
        acc[review.movieId].push(review);
        return acc;
    }, {});
    for (const movieId in grouped) {
        const movieReviews = grouped[movieId];
        const movieItem = document.createElement("div");
        movieItem.className = "review-item";
        movieItem.innerHTML = `<h3>${movieReviews[0].name} - ${movieReviews[0].rating}/10</h3>`;
        movieReviews.forEach((review) => {
            movieItem.innerHTML += `
                  <p>${review.comment}</p>
                  <small>${review.date}</small>
                  <hr>
              `;
        });
        reviewsList.appendChild(movieItem);
    }
}
