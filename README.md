# newsy-server: Simple web-client/api server that proxies requests to newsapi.org.
This package aims to provide a simple proxy for newsapi.org requests, attaching an api key to the request, and returning the result to the client.

Meant to be used with one of the newsy clients such as: https://github.com/recursion/newsy-react-client. (currently the only client - an elm client may be in the works)

Express server cloned from https://github.com/danielfsousa/express-rest-es2017-boilerplate - This package offers way more features than were needed, but it is a robust, and well built boilerplate that included options that may be added later.

# Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [Mongodb](https://mongodb.com)

## Getting Started

- Clone the repo and make it yours:
- Make sure you have a mongo instance up and running.

```bash
git clone --depth 1 https://github.com/recursion/newsy-server
cd newsy-server
rm -rf .git
```

- Install dependencies:

```bash
yarn
```

- Set environment variables:

```bash
cp .env.example .env
```

- Add a client
```bash
git clone --depth 1 https://github.com/recursion/newsy-react-client src/client
```

- Build the client
```bash
cd src/client
npm run build
```

## Running The Server Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

# open nyc test coverage reports
yarn coverage
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Docker

```bash
# run container locally
yarn docker:dev
or
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# run container in production
yarn docker:prod
or
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# run tests
yarn docker:test
or
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

## Deploy

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

Replace my Docker username with yours:

```bash
nano deploy.sh
```

Run deploy script:

```bash
yarn deploy
or
sh ./deploy.sh
```

## Inspirations
I just wanted an easy way to search news stories from multiple sources in an effort to see how different outlets are reporting the same stories.

## License

[MIT License](README.md) - [Michael Symmes](https://github.com/recursion)
