'use strict';

const axios = require('axios');
const type = require('../types/type');

let Classification = require('../models/classification');

function NLP(configs) {
  this.configs = configs.map(function(config){
    return new type[config.type](config);
  });
}

NLP.prototype.classify = function(txt) {
  let configs = this.configs;
  return axios
    .all(this.configs.map(function (c) { return c.get(txt) }))
    .then(function (responses) {
      return responses.map(function(r, i) {
        let config = configs[i];
        config.setResponse(r.data);
        return new Classification(config.getIntent(), config.getScore(), config.getReturnValue());
      });
    });
}
