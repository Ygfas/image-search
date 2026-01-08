// ApiKey1.js
const apiKeyObject = {
  apiKey1: "q4SPLqO6BWgKHSM7lr90OGPiYW7Kh-uHE9pw2bBmboE",
  apiKey2: "-7QZobQZ8vxLgj4eTdt-S4TnKy6iowl7QmaizPyhMCk",
  apiKey3: "adilEobfPqq7iksYeqaEDuRSoxUuTWl067eXdfbO7oQ",
};

class ApiKey {
  #apiKey;

  constructor({ apiKey }) {
    this.#apiKey = apiKey;
  }

  getApiKey() {
    return this.#apiKey;
  }
}

class Token1 extends ApiKey {
  constructor() {
    super({ apiKey: apiKeyObject.apiKey1 }); 
  }
}


class Token2 extends ApiKey {
  constructor() {
    super({ apiKey: apiKeyObject.apiKey2 }); 
  }
}
class Token3 extends ApiKey {
  constructor() {
    super({ apiKey: apiKeyObject.apiKey3 }); 
  }
}

export {Token1, Token2, Token3}
