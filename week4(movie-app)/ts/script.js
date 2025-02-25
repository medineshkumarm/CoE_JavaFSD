var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_KEY = "ec4972a5";
var currentMovieId = "";
// Initial load
document.addEventListener("DOMContentLoaded", function () {
    fetchMovies("Avengers"); // Default trending movies
});
function fetchMovies(searchTerm) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://www.omdbapi.com/?s=".concat(searchTerm, "&apikey=").concat(API_KEY))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    displayMovies(data.Search);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching movies:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayMovies(movies) {
    var grid = document.getElementById("trendingMovies");
    grid.innerHTML = "";
    movies.forEach(function (movie) {
        var movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = "\n              <img src=\"".concat(movie.Poster, "\" class=\"movie-poster\" alt=\"").concat(movie.Title, "\">\n              <div class=\"movie-info\">\n                  <h3>").concat(movie.Title, "</h3>\n                  <p>").concat(movie.Year, "</p>\n              </div>\n          ");
        movieCard.addEventListener("click", function () { return showMovieDetails(movie.imdbID); });
        grid.appendChild(movieCard);
    });
}
function showMovieDetails(movieId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, movie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentMovieId = movieId;
                    return [4 /*yield*/, fetch("https://www.omdbapi.com/?i=".concat(movieId, "&apikey=").concat(API_KEY))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    movie = _a.sent();
                    document.getElementById("home").style.display = "none";
                    document.getElementById("movieDetails").style.display = "block";
                    document.getElementById("reviews").style.display = "none";
                    document.getElementById("movieTitle").textContent = movie.Title;
                    document.getElementById("moviePoster").src = movie.Poster;
                    document.getElementById("movieYear").textContent = "Year: ".concat(movie.Year);
                    document.getElementById("movieRating").textContent = "IMDB Rating: ".concat(movie.imdbRating);
                    document.getElementById("moviePlot").textContent = movie.Plot;
                    document.getElementById("movieId").value = movieId;
                    return [2 /*return*/];
            }
        });
    });
}
function searchMovies() {
    var searchTerm = document.getElementById("searchInput").value;
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
document.getElementById("reviewForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var review = {
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
    var reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}
function displayAllReviews() {
    var reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    var reviewsList = document.getElementById("allReviews");
    reviewsList.innerHTML = "";
    var grouped = reviews.reduce(function (acc, review) {
        acc[review.movieId] = acc[review.movieId] || [];
        acc[review.movieId].push(review);
        return acc;
    }, {});
    var _loop_1 = function (movieId) {
        var movieReviews = grouped[movieId];
        var movieItem = document.createElement("div");
        movieItem.className = "review-item";
        movieItem.innerHTML = "<h3>".concat(movieReviews[0].name, " - ").concat(movieReviews[0].rating, "/10</h3>");
        movieReviews.forEach(function (review) {
            movieItem.innerHTML += "\n                  <p>".concat(review.comment, "</p>\n                  <small>").concat(review.date, "</small>\n                  <hr>\n              ");
        });
        reviewsList.appendChild(movieItem);
    };
    for (var movieId in grouped) {
        _loop_1(movieId);
    }
}
