'use strict';

/**
 * Choose best result
 * @param {Classification[]} classifications
 * @return {Object} returnValue of classification
 */
module.exports = function(classifications) {
  let groupToValues = classifications.reduce(function (obj, item) {
    obj[item.intent] = obj[item.intent] || [];
    obj[item.intent].push(item);
    return obj;
  }, {});

  return Object.keys(
    classifications.reduce(function (obj, item) {
        obj[item.intent] = obj[item.intent] || [];
        obj[item.intent].push(item);
        return obj;
      }, {})
    )
    .map(function (key) {
      return { 
        intent: key,
        scores: groupToValues[key],
        sumOfScore: groupToValues[key]
          .map(function(e) { return e.score })
          .reduce(function(total, score) { return total + score; }, 0)
      };
    })
    .sort(function (a, b) {
      if (b.scores.length != a.scores.length)
        return b.scores.length - a.scores.length;

      return b.sumOfScore - a.sumOfScore;
    })
    .shift()
    .scores
    .sort(function(a, b){ return b.score - a.score })
    .shift()
    .returnValue;
};