'use strict';

var expect = require('chai').expect;
var voting = require('../voting');
var Classification = require('../models/classification')

describe('#voting', function() {
  let thresholdConfig = {
    wordCount: 4,
    score: {
      lte: 0.6,
      gt: 0.4
    },
    returnValue: 'None'
  }

  it('should return returnValue', function() {
    var classifications = [
      new Classification('INFO', 0.001, { result: 'INFO' })
    ]

    var result = voting(classifications);

    expect(result).to.deep.equal({ result: 'INFO' });
  });

  it('should choose the highest scoring result when all intentions are different', function() {
    var classifications = [
      new Classification('INFO', 0.0015, { result: 'INFO' }),
      new Classification('USAGE', 0.002, { result: 'USAGE' }),
      new Classification('HELP', 0.001, { result: 'HELP' }),
      new Classification('TEST', 0.005, { result: 'TEST' }),
      new Classification('CANCEL', 0.002, { result: 'CANCEL' })
    ]

    var result = voting(classifications);

    expect(result).to.deep.equal({ result: 'TEST' });
  });

  it('should choose the most repeated intent and then select the one with the highest score', function() {
    var classifications = [
      new Classification('INFO', 0.004, { result: 'INFO' }),
      new Classification('CANCEL', 0.001, { result: 'CANCEL 0' }),
      new Classification('TEST', 0.003, { result: 'TEST' }),
      new Classification('CANCEL', 0.005, { result: 'CANCEL 1' }),
      new Classification('HELP', 0.007, { result: 'HELP' }),
    ]
    
    var result = voting(classifications);
    
    expect(result).to.deep.equal({ result: 'CANCEL 1' });
  });


  it('should sum scores of equal intents and choose the highest result, when happen tie', function() {
    var classifications = [
      new Classification('INFO', 0.004, { result: 'INFO A' }),
      new Classification('CANCEL', 0.001, { result: 'CANCEL 0' }),
      new Classification('TEST', 0.003, { result: 'TEST' }),
      new Classification('CANCEL', 0.005, { result: 'CANCEL 1' }),
      new Classification('HELP', 0.007, { result: 'HELP' }),
      new Classification('INFO', 0.007, { result: 'INFO B' }),
    ]
    
    var result = voting(classifications);
    
    expect(result).to.deep.equal({ result: 'INFO B' });
  });

  it('should use threshould returnValue when word count is less than or equal configured and classification score is \
smaller.', function() {
    var classifications = [
      new Classification('INFO', 0.004, { result: 'A' }),
      new Classification('CANCEL', 0.001, { result: 'B' }),
      new Classification('TEST', 0.003, { result: 'C' }),
    ]
    
    var result = voting(classifications, thresholdConfig, 'foo bar foo bar');
    
    expect(result).to.deep.equal('None');
  });

  it('should use classification returnValue when word count is less than or equal configured and classification score \
is not smaller.', function() {
    var classifications = [
      new Classification('INFO', 0.7, { result: 'A' }),
      new Classification('CANCEL', 0.001, { result: 'B' }),
      new Classification('TEST', 0.003, { result: 'C' }),
    ]
    
    var result = voting(classifications, thresholdConfig, 'foo bar foo bar');
    
    expect(result).to.deep.equal({ result: 'A' });
  });

  it('should use threshould returnValue when word count is greater than configured and classification score is \
smaller.', function() {
    var classifications = [
      new Classification('INFO', 0.004, { result: 'A' }),
      new Classification('CANCEL', 0.001, { result: 'B' }),
      new Classification('TEST', 0.003, { result: 'C' }),
    ]
    
    var result = voting(classifications, thresholdConfig, 'foo bar foo bar foo');
    
    expect(result).to.deep.equal('None');
  });

  it('should use classification returnValue when word count is greater than configured and classification score \
is not smaller.', function() {
    var classifications = [
      new Classification('INFO', 0.5, { result: 'A' }),
      new Classification('CANCEL', 0.001, { result: 'B' }),
      new Classification('TEST', 0.003, { result: 'C' }),
    ]
    
    var result = voting(classifications, thresholdConfig, 'foo bar foo bar foo');
    
    expect(result).to.deep.equal({ result: 'A' });
  });

});