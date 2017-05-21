const { get } = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_LOG = true;

class Request {
  constructor({ baseURL, withLog, logFn } = {
    baseURL: BASE_URL,
    withLog: DEFAULT_LOG,
    logFn: console.log, // eslint-disable-line
  }) {
    this.url = baseURL;
    this.withLog = withLog;
    this.logFn = logFn;
  }

  log() {
    if (this.withLog) {
      this.logFn(`Request to : ${this.url}`);
    }
  }

  path(pathParts = []) {
    this.url = `${this.url}/${pathParts.join('/')}`;
    return this;
  }

  async get() {
    this.log();
    return (await get(this.url)).data;
  }
}

module.exports = Request;
