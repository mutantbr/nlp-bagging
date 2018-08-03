'use strict';

const axios = require('axios');

function Luis(config) {
  this.url = config.url;
  this.headers = config.headers;
}

Luis.prototype.get = function(txt) {
  return axios.get(
    this.url,
    { 
      params: Object.assign({}, this.headers, { q: txt })
    }
  );
}

module.exports = Luis;
