const request = require('request');
const { newsApi } = require('../../config/vars');

const apiUrl = 'https://newsapi.org/v2';

// process headline requests here
exports.getHeadlines = (req, res) => {
  request(buildHeadlinesQuery(req.query), (err, response, body) => {
    if (!err && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    } else {
      console.error(err);
      console.error(`Status Code: ${response.statusCode}`);
      res
        .status(response.statusCode)
        .send('Error');
    }
  });
};

// process everything searches here
exports.search = (req, res) => {
  request(buildSearchQuery(req.query), (err, response, body) => {
    if (!err && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    } else {
      console.error(err);
      console.error(`Status Code: ${response.statusCode}`);
      res
        .status(response.statusCode)
        .send('Error');
    }
  });
};

// build a query string
// response.query => request.options
const buildHeadlinesQuery = (query) => {
  // we will need to add sources here too - &sources=comma,seperated,sources
  const method = `/top-headlines?country=${query.country || 'us'}`;
  const page = `&page=${(query.page || 1)}`;
  const url = apiUrl + method + page;
  return {
    url,
    headers: { 'X-Api-Key': newsApi },
  };
};


// build a query string
// response.query => request.options
const buildSearchQuery = (query) => {
  // string => string
  const clean = str => str.replace(/[&?p\s]/g, '%20');

  // we will need to add sources here too - &sources=comma,seperated,sources
  const searchMethod = '/everything';
  const searchQuery = `?q=${clean(query.q)}`;
  const page = `&page=${(query.page || 1)}`;
  const sortBy = `&sortBy=${query.sortBy || 'publishedAt'}`;
  const url = apiUrl + searchMethod + searchQuery + page + sortBy;
  return {
    url,
    headers: { 'X-Api-Key': newsApi },
  };
};
