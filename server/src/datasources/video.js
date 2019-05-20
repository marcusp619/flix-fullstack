const { RESTDataSource } = require("apollo-datasource-rest");
require("dotenv").config();

/* The RESTDataSource sets up and in-memory cache that caches responses 
from our REST resources with no additional setup. */

class VideoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/";
  }

  async getMovieVideosById(videoId) {
    const response = await this.get(
      `movie/${videoId}/videos?api_key=${process.env.API_KEY}&language=en-US`
    );

    return response.results.map(video => this.videoReducer(video));
  }

  async getShowVideosById(videoId) {
    const response = await this.get(
      `tv/${videoId}/videos?api_key=${process.env.API_KEY}&language=en-US`
    );

    return response.results.map(video => this.videoReducer(video));
  }

  videoReducer(video) {
    return {
      id: video.id,
      iso_639_1: video.iso_639_1,
      iso_3166_1: video.iso_3166_1,
      key: video.key,
      name: video.name,
      site: video.site,
      size: video.size,
      type: video.type
    };
  }
}

module.exports = VideoAPI;
