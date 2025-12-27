
class ImageService {
  #accessKey
  #baseUrl
  constructor(accessKey) {
    this.#accessKey = accessKey;
    this.#baseUrl = "https://api.unsplash.com";
  }

  getAccessKey(){
    return this.#accessKey;
  }
  getBaseurl(){
    return this.#baseUrl
  }
  async getRandomImages(count = 20) {
    const res = await fetch(`${this.#baseUrl}/photos/random?count=${count}`, {
      headers: {
        Authorization: `Client-ID ${this.#accessKey}`,
      },
    });
    return await res.json();
  }

  async searchImages(query, page = 1, perPage = 20) {
    const res = await fetch(
      `${this.#baseUrl}/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${this.#accessKey}`,
        },
      }
    );
    const data = await res.json();
    return data.results;
  }

  
}

export default ImageService;

