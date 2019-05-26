const mongoose = require("mongoose");

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

module.exports = mongoose.model("video", videoSchema);
