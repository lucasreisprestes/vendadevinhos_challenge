const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://www.mocky.io/v2/',
  timeout: 1000
});

module.export = instance;
