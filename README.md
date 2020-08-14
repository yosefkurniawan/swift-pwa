This is SwiftPWA base project bootstrapped with [Next.js](https://nextjs.org/).

Demo: [https://pwa.getswift.asia/](https://pwa.getswift.asia/)

## Installation

### Without Docker
1. run dev mode on local environment:
```bash
npm run local
# or
yarn local
```
or, run prod mode on local environment:
```bash
npm run local:start
# or
yarn local:start
```
2. Open [http://localhost:3000](http://localhost:3000) on browser to see the frontend.

### With Docker
#### Local environment (dev mode): 
1. build:
```
docker-compose -f ./docker/local/docker-compose.yml build
```
2. run: 
```
docker-compose -f ./docker/local/docker-compose.yml up
```

or, rebuild and run in one step:
```
docker-compose -f ./docker/local/docker-compose.yml up -- build
```

#### Dev environment (prod mode): 
1. build: `docker-compose -f ./docker/dev/docker-compose.yml build`
2. run: `docker-compose -f ./docker/dev/docker-compose.yml up`

or, rebuild and run in one step: `docker-compose -f ./docker/dev/docker-compose.yml up -- build`

#### Prod environment (prod mode):
1. build: `docker-compose build`
2. run: `docker-composer up`

or, rebuild and run in one step: `docker-compose up --build`

## Setup Host and Graphql Endpoint
1. open file swift.config.js
2. edit the host of each environment at this line:
```
const HOST = {
    local: 'http://localhost:3000'
    dev: '[dev url]',
    stage: '[stage url]',
    prod: '[prod url]',
};
```
3. Edit Gql endpoint of each environment at this line:
```
const graphqlEndpoint = {
    local: '[gql endpoint for local]'
    dev: '[gql endpoint for dev]',
    stage: '[gql endpoint for stage]',
    prod: '[gql endpoint for prod]',
};
```
