// ApiKey1.js
const apiKeyObject = {
  apiKey1: "BsGiOlp6sTry3gTElsB7oL7Hbi34bxl4lxhWoEni3CE",
  apiKey2: "V3EA1DrGS1SHxgEEYscWbJgAL7XI5QPQ08sPPAar0Yk",
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
