This is SwiftPWA base project bootstrapped with [Next.js](https://nextjs.org/).

Demo: [https://pwa.getswift.asia/](https://pwa.getswift.asia/)

## Installation

### Without Docker
1. run the development server:
```bash
npm run dev
# or
yarn dev
```
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### With Docker
dev mode: 
open file docker-compose.yml on `docker/local` then change bind volume 
```
    volumes:
        - [project path in local]:[project path in docker]
``` 

```
to build docker-compose -f ./docker/local/docker-compose.yml build
to run docker-compose -f ./docker/local/docker-compose.yml up
to rebuild and run docker-compose -f ./docker/local/docker-compose.yml up -- build
```

prod mode:
```
to build: `docker-compose build`
to run: `docker-composer up`
to re-build and run: `docker-compose up --build`
```




## Setup Host and Graphql Endpoint
1. open file swift.config.js
2. edit host at this line:
```
const HOST = {
    dev: 'http://localhost:3000',
    prod: 'https://swiftpwa.testingnow.me',
};
```
3. Edit Gql endpoint at this line:
```
const graphqlEndpoint = {
    dev: 'https://swiftpwa-be.testingnow.me/graphql',
    prod: 'https://swiftpwa-be.testingnow.me/graphql',
};
```
