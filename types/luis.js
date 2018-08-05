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

Luis.prototype.setResponse = function(data) {
  this.data = data;
}

Luis.prototype.getScore = function() {
  return this.data.topScoringIntent.score;
}

Luis.prototype.getIntent = function() {
  return this.data.topScoringIntent.intent;
}

Luis.prototype.getReturnValue = function() {
  return this.data;
}

module.exports = Luis;
