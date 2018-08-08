'use strict';

const NLP = require('./models/nlp');
const voting = require('./voting');

function NlpBagging(config, threshold) {
  this.nlp = new NLP(config);
  this.threshold = threshold;
}

NlpBagging.prototype.detectIntent  = function(txt) {
  let threshold =  this.threshold;
  return this.nlp
    .classify(txt)
    .then(function (classifications){
      return voting(classifications, threshold, txt);
    });
}

module.exports = NlpBagging;
