const express = require('express');
const router = express.Router();

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
        console.error("Incorrect searchTerm value.");
        return res.send('Invalid Search Term: must be type string.');
    } else {
        return res.send('You Searched: ' + JSON.stringify(req.body));
    }
  });


module.exports = router;