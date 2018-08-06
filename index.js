'use strict';

const NLP = require('./models/nlp');
const voting = require('./voting');

function NlpBagging(config) {
  this.nlp = new NLP(config);
}

NlpBagging.prototype.detectIntent  = function(txt) {
  return this.nlp
    .classify(txt)
    .then(function (classifications){
      return voting(classifications);
    });
}

module.exports = NlpBagging;
