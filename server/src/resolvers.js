module.exports = {
  Query: {
    movies: async (_, __, { dataSources }) =>
      dataSources.movieAPI.getPopularMovies(),
    movie: async (_, { movieId }, { dataSources }) =>
      dataSources.movieAPI.getAMovieById({ movieId })
  },

  Movie: {
    videos: async (parent, __, { dataSources }) =>
      dataSources.videoAPI.getMovieVideosById(parent.id),
    genres: (parent, __, { dataSources }) =>
      dataSources.movieAPI.getGenres(parent.genre_ids)
  }
};
