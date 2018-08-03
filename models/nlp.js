'use strict';

const axios = require('axios');
const type = require('../types/type')

function NLP(configs) {
  this.configs = configs.map(function(config){
    return new type[config.type](config); 
  });
}

NLP.prototype.classify = function(txt) {
  axios
    .all(this.configs.map(function (c) { return c.get(txt) }))
    .then(function (responses) {
      responses.map(function(r, i) {
        console.log(r.data);
        console.log(i);
      });
    });
}

module.exports = NLP;