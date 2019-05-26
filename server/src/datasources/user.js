const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

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

const videoSchema = new mongoose.Schema({
  id: {
    type: String
  },
  iso6391: {
    type: String
  },
  iso31661: {
    type: String
  },
  key: {
    type: Number
  },
  name: {
    type: Number
  },
  site: {
    type: String
  },
  size: {
    type: Number
  },
  type: {
    type: String
  }
});

module.exports = mongoose.model("user", userSchema);
module.exports = mongoose.model("video", videoSchema);
module.exports = mongoose.model("movie", movieSchema);
