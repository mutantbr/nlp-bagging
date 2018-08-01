'use strict';

function Classification(intent, score, returnValue) {
  this.intent = intent;
  this.score = score;
  this.returnValue = returnValue;
}

module.exports = Classification;