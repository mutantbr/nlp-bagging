'use strict';

/**
 * Choose best result
 * @param {Classification[]} classifications
 * @return {Object} returnValue of classification
 */


function execThreshold(text, classification, threshold) {
  let wordCount = text.split(' ').length;

  if (
    (classification.score < threshold.score.lte && wordCount <= threshold.wordCount) || 
    (classification.score < threshold.score.gt && wordCount > threshold.wordCount)
  )
    return threshold.returnValue;
  
  return classification.returnValue;
}

module.exports = function(classifications, threshold, text) {
  let groupToValues = classifications.reduce(function (obj, item) {
    obj[item.intent] = obj[item.intent] || [];
    obj[item.intent].push(item);
    return obj;
  }, {});

  let classification =  Object.keys(
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
    .shift();

  if (!threshold)
    return classification.returnValue;

  return execThreshold(text, classification, threshold);
};