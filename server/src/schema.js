const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    movies: [Movie]
    movie(movieId: ID!): Movie!
    videos: [Video]
    me: User
  }

  # The "Mutation" type is the root of all GraphQL creations, deletions and updates
  type Mutation {
    login(email: String): String
    addMovie(movieId: ID!): MovieUpdateResponse!
    removeMovie(movieId: ID!): MovieUpdateResponse!
  }

  # "MovieType"
  type Movie {
    posterPath: String
    adult: Boolean
    overview: String
    releaseDate: String
    genreIDs: [String]
    genres: String
    id: ID
    originalTitle: String
    originalLanguage: String
    title: String
    backdropPath: String
    popularity: Float
    voteCount: Float
    duration: Int
    videos: [Video]
  }

  # "VideoType"
  type Video {
    id: ID
    iso_639_1: String
    iso_3166_1: String
    key: String
    name: String
    site: String
    size: Int
    type: String
  }

  #"UserType"
  type User {
    id: ID!
    name: String!
    email: String!
    movies: [Movie]!
  }

  type LoginResponse {
    sucess: Boolean!
    message: String
  }

  type MovieUpdateResponse {
    success: Boolean!
    message: String
    movie: Movie
  }
`;

module.exports = typeDefs;
