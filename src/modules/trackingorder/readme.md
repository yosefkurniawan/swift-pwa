# Description

This is a tracking order module that is used to tracking customer order.

# How to install

First, enable your module on swift config with key `trackingorder`

copy `trackingorder.json` under locales folder and paste tp `static/locales` en and id

Module tracking order can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules# Description


## Use default template and no overide
### import Tracking Order module and place on your routing
````
import Page from '../src/modules/trackingorder/default';

export default Page;

````


### 2. if not all custom you can import component on module

````
// for example skeleton not overide and use default template

import Skeleton from '../../modules/brands/views/skeleton';
````
### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code

````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import FormView from '../../modules/trackingorder/views/template/form';
// custome result view
import ResultView from './template/result';

// get from current module
import Skeleton from '../../modules/trackingorder/views/skeletonform';
import SkeletonResult from '../../modules/trackingorder/views/skeletonresult';
import TrackingOrder from '../../modules/trackingorder/core';

const DefaultTracking = (props) => (
    <TrackingOrder
        {...props}
        FormView={FormView}
        ResultView={ResultView}
        Skeleton={Skeleton}
        SkeletonResult={SkeletonResult}
    />
);

DefaultTracking.getInitialProps = async () => ({
    namespacesRequired: ['trackingorder', 'validate', 'contact'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultTracking));

````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance

# Components
### 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|

### 2. Base
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| FormView      |  true    | views component, you can use default component or custom | Component |
| Skeleton      |  true    |  views component, you can use default component or custom | Component |
| ResultView      |  true    | views component, you can use default component or custom | Component |
| SkeletonResult      |  true    |  views component, you can use default component or custom | Component |
| pageConfig  |  false   | object configuration page layout      | Object|
| generateAllData  |  false   | function to generate all data array      | Function|


## Override Config
### pageConfig

````
const pageConfig = {
    headerBackIcon: 'arrow', // available values: "close", "arrow",
    // you can add some here
};
````

# Properties sent to the component
1. ResultView

   array orders result
   ````
   {
        detail: [{…}]
        grand_total: 0
        id: 137
        order_number: "000000137"
        status: "complete"
        status_label: "Complete"
        __typename: "CustomerOrder"
   }
   ````

2. FormView

| Name       | Description | Type |
| :---       | :---        |:---        |
| formik     | formik  function handle validation and value| Function |
| handleOpenDialog     | function to trigger open dialog| Function |
| orderField     | value form field order (email and order number)| Object |
| openDialog     | value dialog open or no| boolean |