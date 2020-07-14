# Description
This is a order module that is used to display order history list and order history detail.

# Contents
- [History Order](#history-order) 
- [Order Detail](#order-detail) 

## How to install
First, enable your module on swift config with key ````order````

copy `order.json` under locales folder and paste tp `static/locales` en and id

## History Order
Module history order can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules

## Use default template and no overide
### import Brands module and place on your routing
````
import Page from '../../../src/modules/order/history/default';

export default Page;
````


## Use ustom template
### 1. import core module

````
import Page from '../../../src/modules/order/history/core';
````

### 2. if not all custom you can import component on module

````
// for example skeleton not overide and use default template

import Skeleton from '../../modules/order/history/views/skeleton';
````
### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';

// import your custom template
import Content from './template'

import Core from '../../../src/modules/order/history/core';
import Item from '../../../src/modules/order/history/views/item';
import Skeleton from '../../../src/modules/order/history/views/skeleton';
import ErrorView from '../../../src/modules/order/history/views//error';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} ErrorView={ErrorView} />
);

DefaultOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));

````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance

# Components
### 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|

### 2. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| Content      |  true    | views component, you can use default component or custom | Component |
| Skeleton      |  true    |  views component, you can use default component or custom | Component |
component or custom | Component |
| ErrorView      |  true    |  views component, you can use default component or custom | Component |
| pageConfig  |  false   | object configuration page layout      | Object|
| size  |  false   | custom count per page history list     | Number|

## Override Config
### pageConfig

````
const pageConfig = {
    headerBackIcon: 'arrow', // available values: "close", "arrow",
    // you can add some here
};
````

# Properties sent to the component
1. ErrorView

| Props       | Description | Type |
| :---        | :---        |:---  |
| message     |  message of error      | String|
| type        |  type of error      | String|

2. Content

| Props       | Description | Type |
| :---        | :---        |:---  |
| data     |  data item history order      | Object |
| handleLoadMore        |  function to trigger loadmore      | Function|
| loadMore        |  variable to notif is loadmore or not      | Boolean |
| page        |  page position current list   | Number|
| loading        |  variable to notif loading or not request graphql      | Boolean|

## Order Detail
Example text blah. Example text blah. Example text blah. Example text blah.