NLP Bagging
=========

Nodes Bagging for NLP Tools
![Bagging Architecture](bagging-architecture.png)


## Installation

  `npm i -S @mutantbr/nlp-bagging`

## Usage
  ```node
    let NlpBagging = require('@mutantbr/nlp-bagging');

    let thresholdConfig = {
      wordCount: 4,
      score: {
        lte: 0.6,
        gt: 0.4
      },
      returnValue: 'None'
    }

    // threshold is an optional param

    let bagging = new NlpBagging([{
      type: 'Luis',
      config: {
        url: 'https://brazilsouth.api.cognitive.microsoft.com/luis/v2.0/apps/aaa111',
        headers: {
          'subscription-key': '--------',
          verbose: true,
          timezoneOffset: 0
        }
      }
    },{
      type: 'Luis',
      config: {
        url: 'https://brazilsouth.api.cognitive.microsoft.com/luis/v2.0/apps/xxxaaa',
        headers: {
          'subscription-key': '--------',
          verbose: true,
          timezoneOffset: 0
        }
      }
    },{
      type: 'Luis',
      config: {
        url: 'https://brazilsouth.api.cognitive.microsoft.com/luis/v2.0/apps/abc123',
        headers: {
          'subscription-key': '---------',
          verbose: true,
          timezoneOffset: 0
        }
      }
    }],
    thresholdConfig);

    bagging
      .detectIntent('hi')
      .then(function(i) {
        console.log(i.topScoringIntent);
      });

    bagging
      .detectIntent('are you a bot')
      .then(function(i) {
        console.log(i.topScoringIntent);
      });
  ```

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

### Supporting others NLP tools

1) Create your file in folder `types`, following `luis.js` example.
2) Add your type to `types/type.js` mapper.
