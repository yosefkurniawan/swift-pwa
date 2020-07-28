# description

this plugins to handle add new address

# how to install 

this plugins can install without custome or with custom  template

## without custom template 

if you not install with custom template you only import and place onyour components

example:
````
import AddressFormDialog from '@core/customer/plugins/AddressFormDialog';

<AddressFormDialog
    {...dialogProps}
    t={t}
    onSubmitAddress={async (dataAddress) => {
        const { cart } = checkout.data;
        let state = { ...checkout };

        await setAddress(dataAddress, cart);
        state.status.addresses = true;
        setCheckout(state);

        _.delay(() => {
            state = { ...checkout };
            state.status.openAddressDialog = false;
            setCheckout(state);
            state.status.addresses = false;
            setCheckout(state);
        }, CLOSE_ADDRESS_DIALOG);
    }}
    loading={checkout.loading.addresses}
    success={checkout.status.addresses}
    open={checkout.status.openAddressDialog}
    disableDefaultAddress
    setOpen={() => setCheckout({
        ...checkout,
        status: {
            ...checkout.status,
            openAddressDialog: false,
        },
    })}
    pageTitle={t('checkout:address:addTitle')}
/>
````

# Components
### 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageTitle  |  false   | title on plugins     | String|
| setOpen  |  true   | Function to handle toogle open dialog address     | Function|
| open  |  true   | value to notif open address dialog or not    | Boolean|
| disableDefaultAddress  |  false   | value disabled address or not    | Boolean|