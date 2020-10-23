This is SwiftPWA base project bootstrapped with [Next.js](https://nextjs.org/).

Demo: [https://swiftpwa.testingnow.me/](https://swiftpwa.testingnow.me/)

## Pre-Installation (Development only!)
1. clone repo swift-pwa, then run: npm install or yarn install
2. clone repo swift-pwa-core
3. in local directory ~/swift-pwa-core, run: npm link or yarn link
4. in local directory ~/swift-pwa, run: npm link swift-pwa-core or yarn link swift-pwa-core
5. Any changes in ~/swift-pwa-core will be reflected in ~/swift-pwa/node_modules/swift-pwa-core

## Installation

if you need to run on your local, in firstime you need to build static assets with command line

```bash
yarn install
# or
npm install
```

then


```bash
npm run assets:build
# or
yarn assets:build

```

only in firstime if no change code on static assets

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

or, rebuild and run in one step: `docker-compose -f ./docker/dev/docker-compose.yml up --build`

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

## Core 
### Modules
Core modules are served as a package in separate repo: https://github.com/icubeus/swift-pwa-core
### [Helpers](core/helpers/readme.md) 
### [Libraries](core/lib/readme.md) 
### [Public](core/public/readme.md) 
