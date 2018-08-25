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
        ({ sources } = JSON.parse(body));
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(sources));
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
    res.send(JSON.stringify(sources));
  }
};

// process everything searches here
exports.search = (req, res) => {
  request(buildQuery('everything', req), (err, response, body) => {
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
  request(buildQuery('top-headlines', req), (err, response, body) => {
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
};


const buildQuery = (target, req) => {
  const i = req.url.indexOf('?');
  const q = req.url.substr(i + 1);
  const url = `${apiUrl}/${target}?${q}`;

  console.log('Built URL: ', url);
  return {
    url,
    headers: { 'X-Api-Key': newsApiKey },
  };
};
