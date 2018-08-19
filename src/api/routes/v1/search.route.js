const express = require('express');
const router = express.Router();
const { newsApi } = require('../../../config/vars');
const request = require('request');

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
  .get((req, res) => {
    if (typeof req.query.q !== 'string') {
        // we may end up passing validations to its own module as is done in other router
        console.error("Incorrect searchTerm value.");
        res.send('Invalid Search Term: must be type string.');
    } else {
        request(buildQuery(req.query.q), (err, response, body) => {
            if (!err && response.statusCode === 200) {
                // console.log(JSON.parse(body));
                res.setHeader('Content-Type', 'application/json');
                res.send(body);
            } else {
                console.error(err);
                console.error(`Status Code: ${response.statusCode}`);
            }
        })
    }
  });

const buildQuery = (query) => {
    // we will need to add sources here too - &sources=comma,seperated,sources
    const apiUrl = 'https://newsapi.org/v2';
    const searchMethod = '/everything';
    const searchQuery = '?q=' + query
    const url = apiUrl + searchMethod + searchQuery; // + api;
    return {
        url, 
        headers: {"X-Api-Key": newsApi}
    };
};

module.exports = router;