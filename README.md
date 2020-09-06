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

# Core modules
- [Blog](src/core/blog/readme.md) 
- [Brands](src/core/brands/readme.md) 
- [Cart](src/core/cart/readme.md) 
- [Catalog](src/core/catalog/readme.md) 
- [Checkout](src/core/checkout/readme.md) 
- [CMS](src/core/cms/readme.md) 
- [Confirm Payment](src/core/confirmpayment/readme.md) 
- [Contact](src/core/contact/readme.md) 
- [Customer](src/core/customer/readme.md) 
- [Product](src/core/product/readme.md) 
- [Error](src/core/error/readme.md) 
- [Forgot Password](src/core/forgotpassword/readme.md) 
- [Home](src/core/home/readme.md) 
- [Login](src/core/login/readme.md) 
- [Maintenance](src/core/maintenance/readme.md) 
- [Notification](src/core/notification/readme.md) 
- [Order](src/core/order/readme.md) 
- [Register](src/core/register/readme.md) 
- [Reward Point](src/core/rewardpoint/readme.md) 
- [RMA](src/core/rma/readme.md) 
- [Search Result](src/core/searchresult/readme.md) 
- [Slug](src/core/slug/readme.md) 
- [Store Credit](src/core/storecredit/readme.md) 
- [Thanks](src/core/thanks/readme.md) 
- [Tracking Order](src/core/trackingorder/readme.md) 
- [Common components](src/core/commons/readme.md)
