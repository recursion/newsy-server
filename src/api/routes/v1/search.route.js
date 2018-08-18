const express = require('express');
const router = express.Router();
const { newsApi } = require('../../../config/vars');
const https = require('https');

router
  .route('/')
  /**
   * @api {post} v1/search Search news
   * @apiDescription Get a list of news articles related to search term
   * @apiVersion 1.0.0
   * @apiName Search
   * @apiGroup Search
   * @apiPermission None
   *
   * @apiSuccess {Object[]} news List of news.
   *
   */
  .post((req, res) => {
    if (typeof req.body.searchTerm !== 'string') {
        // we may end up passing validations to its own module as is done in other router
        console.error("Incorrect searchTerm value.");
        res.send('Invalid Search Term: must be type string.');
    } else {
        // we will need to add sources here too - &sources=comma,seperated,sources
        let query = 'https://newsapi.org/v2/everything?q=' + req.body.searchTerm + '&apiKey=' + newsApi;
        https.get(query, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            })
            resp.on('end', () => {
                // console.log(JSON.parse(data));
                res.send('You Searched: ' + JSON.stringify(req.body) + ' and got back: ' + data);
            })
        });
    }
  });


module.exports = router;