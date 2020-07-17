# Description

Module checkout can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules


# How to install
## Use default template and no overide
### import Checkout module and place on your routing
````
import Page from '@core/checkout/pages/default';
export default Page;
````


### 2. if not all custom you can import component on module

````
// for example skeleton not overide and use default template
import CashbackInfo from '@core/checkout/pages/default/components/CashbackInfo';
````
### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Checkout from '@core/checkout/pages/default/core';
import CashbackInfo from '@core/checkout/pages/default/components/CashbackInfo';

const CheckoutPage = (props) => (
    // generate checkout page from module
    <Checkout {...props}
        CashbackInfoView={CashbackInfo}
    />
);

CheckoutPage.getInitialProps = async (ctx) => {
    const cartId = cookies(ctx).nci || null;

    if (!cartId) {
        redirect(ctx, '/checkout/cart');
    }

    return {
        namespacesRequired: ['common', 'checkout', 'validate'],
        cartId,
    };
};

export default withApollo({ ssr: true })(withTranslation()(CheckoutPage));

````

### Note
#### * this module use cartId, so need get from cookies first on getInitialProps
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
| CashbackInfoView| true | template show how many cashback get by customer| Function Component |
| EmailView| true | template show how many cashback get by customer| Function Component |
| DeliveryView| true | template show delivery option| Function  Component|
| DeliverySkeleton| true | template show how many cashback get by customer| Function  Component|

# Properties sent to the component
1. CashbackInfo

| Props       | Description | Type |
| :---        | :---        |:---  |
| message     |  message to show on template      | Array |
| currency     |  type  currency string      | String |
| price     |  amout cashback      | Number |

2. EmailView

| Props       | Description | Type |
| :---        | :---        |:---  |
| formik     |  Formik function     | Function |
| setAnchorEl     |  function to set anchorEl to set on popover material ui     | Function |
| anchorEl     |  anchorEl to set on popover material ui      | Array |
| open     |  value to notif anchor popover show or not      | Boolean |
| t     |  function to translation      | Function |

3. DeliveryView

| Props       | Description | Type |
| :---        | :---        |:---  |
| checkout     |  data checkout      | Object |
| handleSelect     |  function to select shiping method     | Function |

# Default Template
1. CashbackInfo `@core/checkout/pages/default/components/CashbackInfo`
1. EmailView `@core/checkout/pages/default/components/email`
1. DeliveryView `@core/checkout/pages/default/components/delivery`
1. DeliverySkeleton `@core/checkout/pages/default/components/delivery/skeleton`