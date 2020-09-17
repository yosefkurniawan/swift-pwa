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
- [Blog](src/core/modules/blog/readme.md) 
- [Brands](src/core/modules/brands/readme.md) 
- [Cart](src/core/modules/cart/readme.md) 
- [Catalog](src/core/modules/catalog/readme.md) 
- [Checkout](src/core/modules/checkout/readme.md) 
- [CMS](src/core/modules/cms/readme.md) 
- [Confirm Payment](src/core/modules/confirmpayment/readme.md) 
- [Contact](src/core/modules/contact/readme.md) 
- [Customer](src/core/modules/customer/readme.md) 
- [Product](src/core/modules/product/readme.md) 
- [Error](src/core/modules/error/readme.md) 
- [Forgot Password](src/core/modules/forgotpassword/readme.md) 
- [Home](src/core/modules/home/readme.md) 
- [Login](src/core/modules/login/readme.md) 
- [Maintenance](src/core/modules/maintenance/readme.md) 
- [Notification](src/core/modules/notification/readme.md) 
- [Order](src/core/modules/order/readme.md) 
- [Register](src/core/modules/register/readme.md) 
- [Reward Point](src/core/modules/rewardpoint/readme.md) 
- [RMA](src/core/modules/rma/readme.md) 
- [Search Result](src/core/modules/searchresult/readme.md) 
- [Slug](src/core/modules/slug/readme.md) 
- [Store Credit](src/core/modules/storecredit/readme.md) 
- [Thanks](src/core/modules/thanks/readme.md) 
- [Tracking Order](src/core/modules/trackingorder/readme.md) 
- [Common components](src/core/modules/commons/readme.md)
