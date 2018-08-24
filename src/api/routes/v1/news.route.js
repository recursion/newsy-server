const express = require('express');
const controller = require('../../controllers/news.controller');

const router = express.Router();

router
  .route('/search')
  .get(controller.search);

router
  .route('/sources')
  .get(controller.getSources);

router
  .route('/headlines')
  .get(controller.getHeadlines);

module.exports = router;
