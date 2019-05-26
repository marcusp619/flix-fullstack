module.exports = {
  Query: {
    movies: async (_, __, { dataSources }) =>
      dataSources.movieAPI.getPopularMovies(),
    movie: async (_, { movieId }, { dataSources }) =>
      dataSources.movieAPI.getAMovieById({ movieId }),
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  },
  Mutation: {
    login: async (_, { email, name }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email, name });
      if (user) return Buffer.from(email).toString("base64");
    },
    addMovie: async (_, { movieId }, { dataSources }) => {
      const result = await dataSources.userAPI.addMovie({ movieId });
    }
  },
  Movie: {
    videos: async (parent, __, { dataSources }) =>
      dataSources.videoAPI.getMovieVideosById(parent.id),
    genres: (parent, __, { dataSources }) =>
      dataSources.movieAPI.getGenres(parent.genre_ids)
  }
};
