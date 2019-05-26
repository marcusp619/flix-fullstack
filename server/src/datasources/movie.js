const { RESTDataSource } = require("apollo-datasource-rest");
require("dotenv").config();

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/movie/";
  }

  async getPopularMovies() {
    const response = await this.get(
      `popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    console.log(response.results);
    return response.hasOwnProperty("results")
      ? response.results.map(movie => this.moviesReducer(movie))
      : [];
  }

  async getAMovieById(movieID) {
    const response = await this.get(
      `${movieID}?api_key=${process.env.API_KEY}&language=en-US`
    );

    return this.moviesReducer(response);
  }

  async getMoviesByIds({ movieIds }) {
    return Promise.all(
      movieIds.map(movie => this.getAMovieById(movie.movieID))
    );
  }

  getGenres(genreIds) {
    const conversionSet = {
      28: " Action ",
      12: " Adventure ",
      16: " Animation ",
      35: " Comedy ",
      80: " Crime ",
      99: " Documentary ",
      18: " Drama ",
      10751: " Family ",
      14: " Fantasy ",
      36: " History ",
      27: " Horror ",
      10402: " Music ",
      9648: " Mystery ",
      10749: " Romance ",
      878: " Science Fiction ",
      10770: " TV Movie ",
      53: " Thriller ",
      10752: " War ",
      37: " Western "
    };
    const genres = genreIds
      .toString()
      .replace(/[^,]+/g, toReplace => conversionSet[toReplace]);

    return genres;
  }

  moviesReducer(movie) {
    return {
      posterPath: movie.poster_path,
      adult: movie.adult,
      overview: movie.overview,
      releaseDate: movie.release_date,
      genreIDs: movie.genre_ids,
      genres: movie.genres,
      id: movie.id,
      originalTitle: movie.original_title,
      originalLanguage: movie.original_language,
      title: movie.title,
      backdropPath: movie.backdrop_path,
      popularity: movie.popularity,
      voteCount: movie.vote_count,
      duration: movie.duration,
      videos: movie.videos
    };
  }
}

module.exports = MovieAPI;
