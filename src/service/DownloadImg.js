class DownloadImg {
  #filename;
  #url;
  constructor(url, filename = "") {
    this.#url = url;
    this.#filename = filename;
  }
  getUrl() {
    return this.#url;
  }
  getFilenamel() {
    return this.#filename;
  }
}
