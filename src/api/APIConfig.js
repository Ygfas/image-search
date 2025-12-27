class APIConfig {
    constructor(){
        if(APIConfig.instance) return APIConfig.instance;
        this.baseURL = "https://api.unsplash.com/";
        APIConfig.instance = this
    }
}

export const apiConfig = new APIConfig();