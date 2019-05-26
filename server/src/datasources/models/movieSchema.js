const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  posterPath: {
    type: String
  },
  adult: {
    type: Boolean
  },
  overview: {
    type: String
  },
  releaseDate: {
    type: String
  },
  genreIDs: [{ type: String }],
  genres: {
    type: String
  },
  id: {
    type: String
  },
  originalTitle: {
    type: String
  },
  originalLanguage: {
    type: String
  },
  title: {
    type: String
  },
  backdropPath: {
    type: String
  },
  popularity: {
    type: Number
  },
  voteCount: {
    type: Number
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video"
    }
  ]
});

module.exports = mongoose.model("movie", movieSchema);
