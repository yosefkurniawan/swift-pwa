/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
// Library
import AddressFormDialog from '@core/customer/plugins/AddressFormDialog';
import Button from '@common_button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Add from '@material-ui/icons/Add';
import ItemAddress from './item';
import useStyles from './style';
import Skeleton from './skeleton';

// Main Render Page
const Content = (props) => {
    // style
    const styles = useStyles();
    const {
        loading, address, selectedAddressId,
        handleChange, handleOpenNew, handleAddress, loadingAddress,
        success, openNew, t,
    } = props;
    const getItemAddress = () => {
        let content;
        if (loading) {
            content = <Skeleton />;
        } else if (!address) {
            content = <Skeleton />;
        } else if (address.length === 0) {
            content = null;
        } else {
            content = address.map((item) => (
                <ItemAddress
                    handleAddress={handleAddress}
                    checked={item.id == selectedAddressId}
                    key={item.id}
                    addressId={item.id}
                    firstname={item.firstname}
                    lastname={item.lastname}
                    telephone={item.telephone}
                    postcode={item.postcode}
                    region={item.region.region}
                    city={item.city}
                    country={item.country_code}
                    street={item.street.join(' ')}
                    value={item.id}
                    customAttributes={item.custom_attributes}
                    defaultBilling={item.default_billing}
                    defaultShipping={item.default_shipping}
                    loadingAddress={loadingAddress}
                    success={success}
                    {...props}
                />
            ));
        }

        return content;
    };

    return (
        <>
            <div>
                <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                    {getItemAddress()}
                </RadioGroup>
                <div className={[styles.address_action].join(' ')}>
                    <Button variant="outlined" size="small" onClick={() => handleOpenNew()}>
                        <span style={{ marginRight: '15px' }}>{t('customer:address:addTitle')}</span>
                        <Add />
                    </Button>
                </div>
            </div>
            <AddressFormDialog
                {...props}
                onSubmitAddress={(data, type) => {
                    handleAddress(data, type);
                }}
                loading={loadingAddress}
                success={success}
                open={openNew}
                setOpen={() => handleOpenNew(!openNew)}
            />
        </>
    );
};

export default Content;
