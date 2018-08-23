const express = require('express');
const controller = require('../../controllers/news.controller');

const router = express.Router();

router
  .route('/search')
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
  .post(controller.search);

router
  .route('/headlines')
  .get(controller.getHeadlines);

module.exports = router;
