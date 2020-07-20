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
| SummaryView| true | template show summary | Function  Component|
| AddressView| true | template handle address | Function  Component|

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

4. Summary View

| Props       | Description | Type |
| :---        | :---        |:---  |
| handlePlaceOrder     |  handle place order       | Function |
| loading     |   value to notif loading or no place order   | Boolean |
| data     |  data object checkout    | Object |
| total     |  total price summary    | number |
| t     |  function to translate     | Function |
| disabled     |  value to notif can place order or not     | Boolean |

5. AddressView

| Props       | Description | Type | Example |
| :---        | :---        |:---  | :--- |
| data     |  data checkout       | Object | - |
| checkout     |  handle place order       | Function |- |
| setAddress     |  handle set address       | Function | - |
| setCheckout     |  function to handle set checkout data      | Function |- |
| t     |  function to handle translation      | Function |- |
| dialogProps     |  data address        | Object | `{"region":"Bali","country":"ID","city":"Amlapura, Amlapura","street":"in street address","firstname":"Arfa","lastname":"Test","postcode":"57452","telephone":"085643892690"}` |
| loading     |  value to notif loading or no place order       | Boolean |- |
| address     |  default address data       | Object |- |
| content     |  string message address       | String |- |

# Default Template
1. CashbackInfo `@core/checkout/pages/default/components/CashbackInfo`
2. EmailView `@core/checkout/pages/default/components/email`
3. DeliveryView `@core/checkout/pages/default/components/delivery`
4. DeliverySkeleton `@core/checkout/pages/default/components/delivery/skeleton`
5. SummaryView `@core/checkout/pages/default/components/summary/view`