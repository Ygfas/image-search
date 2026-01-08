
// class ImageService {
//   #accessKey
//   #baseUrl
//   constructor(accessKey) {
//     this.#accessKey = accessKey;
//     this.#baseUrl = "https://api.unsplash.com";
//   }

//   getAccessKey(){
//     return this.#accessKey;
//   }
//   getBaseurl(){
//     return this.#baseUrl
//   }
//   async getRandomImages(count = 20) {
//     const res = await fetch(`${this.#baseUrl}/photos/random?count=${count}`, {
//       headers: {
//         Authorization: `Client-ID ${this.#accessKey}`,
//       },
//     });
//     return await res.json();
//   }

//   async searchImages(query, page = 1, perPage = 20) {
//     const res = await fetch(
//       `${this.#baseUrl}/search/photos?query=${encodeURIComponent(
//         query
//       )}&page=${page}&per_page=${perPage}`,
//       {
//         headers: {
//           Authorization: `Client-ID ${this.#accessKey}`,
//         },
//       }
//     );
//     const data = await res.json();
//     return data.results;
//   }

  
// }

// export default ImageService;

// src/services/ImageService.js
class ImageService {
  constructor() {
    // Alamat Proxy Server kamu
    this.proxyUrl = "http://localhost:5000/api/unsplash";
  }

  async fetchFromProxy(endpoint, params = {}) {
    const queryString = new URLSearchParams({
      endpoint,
      ...params
    }).toString();

    const response = await fetch(`${this.proxyUrl}?${queryString}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Gagal mengambil data dari Proxy");
    }
    
    return await response.json();
  }

  // Menyamakan dengan kode lama: getRandomImages (pake 's' & parameter count)
  async getRandomImages(count = 20) {
    // Kita kirim parameter 'count' ke proxy
    return await this.fetchFromProxy("photos/random", { count });
  }

  // Menyamakan dengan kode lama: searchImages
  async searchImages(query, page = 1, perPage = 20) {
    const data = await this.fetchFromProxy("search/photos", { 
      query, 
      page, 
      per_page: perPage 
    });
    
    // Unsplash API membungkus hasil search dalam property 'results'
    // Kode lama kamu me-return data.results, jadi kita samakan di sini
    return data.results || []; 
  }

  // Fungsi tambahan untuk mendapatkan foto terbaru (Home Feed)
  async getLatestPhotos(page = 1, perPage = 20) {
    return await this.fetchFromProxy("photos", { page, per_page: perPage });
  }

  // WAJIB: Fungsi untuk hit endpoint download_location Unsplash
  async trackDownload(downloadLocationUrl) {
    const response = await fetch(
      `http://localhost:5000/api/unsplash?endpoint=photos/download&download_location=${encodeURIComponent(downloadLocationUrl)}`
    );
    return await response.json();
  }
}

export const imageService = new ImageService();