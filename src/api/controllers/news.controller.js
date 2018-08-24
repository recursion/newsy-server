const request = require('request');
const { newsApiKey } = require('../../config/vars');

const apiUrl = 'https://newsApi.org/v2';

// keep sources cached after one request
// in the future this would need to be updated on occasion
let sources = [];

exports.getSources = (req, res) => {
  if (sources.length === 0) {
    request(buildSourcesQuery(), (err, response, body) => {
      if (!err && response.statusCode === 200) {
        ({ sources } = body);
        res.setHeader('Content-Type', 'application/json');
        res.send(sources);
      } else {
        console.error(err);
        console.error(`Status Code: ${response.statusCode}`);
        res
          .status(response.statusCode)
          .send('Error');
      }
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(sources);
  }
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


const buildSourcesQuery = () => {
  const url = `${apiUrl}/sources`;
  return {
    url,
    headers: { 'X-Api-Key': newsApiKey },
  };

}
// build a query string
// response.query => request.options
const buildHeadlinesQuery = (query) => {
  // we will need to add sources here too - &sources=comma,seperated,sources
  const method = `/top-headlines?country=${query.country || 'us'}`;
  const page = `&page=${(query.page || 1)}`;
  const url = apiUrl + method + page;
  return {
    url,
    headers: { 'X-Api-Key': newsApiKey },
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
    headers: { 'X-Api-Key': newsApiKey },
  };
};
