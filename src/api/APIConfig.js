class APIConfig {
    #baseURL
  constructor() {
    if (APIConfig.instance) return APIConfig.instance;
    this.#baseURL = "https://api.unsplash.com/";
    APIConfig.instance = this;
  }
  getApiKey() {
    return this.#baseURL;
  }
}

export const apiConfig = new APIConfig();