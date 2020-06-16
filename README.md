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
1. to set running mode, edit file `dockerfile`. Edit this line `CMD [ "npm", "run", "dev" ]`

dev mode: 
```
[ "npm", "run", "dev" ]
```
prod mode:
```
[ "npm", "run", "build" ]
[ "npm", "run", "start" ]
```

2. to bind volume, edit file `docker-compose.yml`. Add this code under `services > frontend`:
```
volumes:
            - [project path in local]:[project path in docker]
```

3. to build: `docker-compose build`
4. to run: `docker-composer up`
5. to re-build and run: `docker-compose up --build`

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
