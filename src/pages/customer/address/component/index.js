/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
// Library
import Button from '@components/Button';
import { Box, RadioGroup } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
// import _ from 'lodash';
// import Loading from '@components/Loaders';
import Backdrop from '@components/Loaders/Backdrop';
import AddAddressDialog from './AddDialog';
import ItemAddress from './ItemAddress';
import useStyles from './style';
import gqlServiceCheckout from '../../../checkout/services/graphql';
import gqlService from '../services/graphql';

// Main Render Page
const Content = (props) => {
    const getCustomer = gqlServiceCheckout.getCustomer();
    const [updatedDefaultAddress] = gqlService.updatedDefaultAddress();
    const styles = useStyles();
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [drawer, setDrawer] = useState(false);

    const [, setMapPosition] = useState({
        lat: -6.197361,
        lng: 106.774535,
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setMapPosition({
            lat,
            lng,
        });
    };

    const handleDraweClick = () => {
        setDrawer(!drawer);
    };

    useEffect(() => {
        setLoading(true);
        if (!getCustomer.loading && getCustomer.data) {
            const { customer } = getCustomer.data;
            // eslint-disable-next-line no-shadow
            const selectedAddress = customer.addresses.find((address) => address.default_shipping);

            if (selectedAddress) {
                setSelectedAddress(selectedAddress.id);
            }

            setAddress(customer.addresses);
        }
        setLoading(false);

        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, [getCustomer]);

    const handleChange = async (event) => {
        setShowBackdrop(true);
        const addressId = event.target.value;
        setSelectedAddress(addressId);
        await updatedDefaultAddress({ variables: { addressId } });
        await getCustomer.refetch();
        // setAddress(getCustomer.data.customer.addresses);
        setShowBackdrop(false);
    };

    const handleDialogSubmit = async () => {
        setLoading(true);
        await getCustomer.refetch();
        // setAddress(getCustomer.data.customer.addresses);
        setLoading(false);
    };

    return (
        <>
            <Backdrop open={showBackdrop} />
            <Box>
                <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddress}>
                    {loading
                        ? null
                        : !address
                            ? null
                            : address.length == 0
                                ? null
                                : address.map((item) => (
                                    <ItemAddress
                                        checked={item.id == selectedAddress}
                                        key={item.id}
                                        addressId={item.id}
                                        firstName={item.firstname}
                                        lastName={item.lastname}
                                        phoneNumber={item.telephone}
                                        posCode={item.postcode}
                                        region={item.region.region}
                                        city={item.city}
                                        country={item.country_code}
                                        street={item.street.join(' ')}
                                        value={item.id}
                                        defaultBilling={item.default_billing}
                                        defaultShipping={item.default_shipping}
                                        onSubmitAddress={handleDialogSubmit}
                                        {...props}
                                    />
                                ))}
                </RadioGroup>
                <Box className={[styles.address_action].join(' ')}>
                    <Button variant="outlined" size="small" onClick={() => handleDraweClick()}>
                        <span style={{ marginRight: '15px' }}>Add New Address</span>
                        <Add />
                    </Button>
                </Box>
            </Box>
            <AddAddressDialog
                {...props}
                onSubmitAddress={() => {
                    setDrawer(!drawer);
                    handleDialogSubmit();
                }}
                open={drawer}
                setOpen={() => setDrawer(!drawer)}
            />
        </>
    );
};

export default Content;
