This is SwiftPWA base project bootstrapped with [Next.js](https://nextjs.org/).

Demo: [https://pwa.getswift.asia/](https://pwa.getswift.asia/)

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
- [Blog](core/modules/blog/readme.md) 
- [Brands](core/modules/brands/readme.md) 
- [Cart](core/modules/cart/readme.md) 
- [Catalog](core/modules/catalog/readme.md) 
- [Checkout](core/modules/checkout/readme.md) 
- [CMS](core/modules/cms/readme.md) 
- [Confirm Payment](core/modules/confirmpayment/readme.md) 
- [Contact](core/modules/contact/readme.md) 
- [Customer](core/modules/customer/readme.md) 
- [Product](core/modules/product/readme.md) 
- [Error](core/modules/error/readme.md) 
- [Forgot Password](core/modules/forgotpassword/readme.md) 
- [Home](core/modules/home/readme.md) 
- [Login](core/modules/login/readme.md) 
- [Maintenance](core/modules/maintenance/readme.md) 
- [Notification](core/modules/notification/readme.md) 
- [Order](core/modules/order/readme.md) 
- [Register](core/modules/register/readme.md) 
- [Reward Point](core/modules/rewardpoint/readme.md) 
- [RMA](core/modules/rma/readme.md) 
- [Search Result](core/modules/searchresult/readme.md) 
- [Slug](core/modules/slug/readme.md) 
- [Store Credit](core/modules/storecredit/readme.md) 
- [Thanks](core/modules/thanks/readme.md) 
- [Tracking Order](core/modules/trackingorder/readme.md) 
- [Store Locator](core/modules/storelocator/readme.md) 
- [Common components](core/modules/commons/readme.md)

### [Helpers](core/helpers/readme.md) 
### [Libraries](core/lib/readme.md) 
### [Public](core/public/readme.md) 
