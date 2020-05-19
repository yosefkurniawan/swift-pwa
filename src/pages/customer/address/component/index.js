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
import AddressFormDialog from '@components/AddressFormDialog';
import Button from '@components/Button';
import { Box, RadioGroup } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Backdrop from '@components/Loaders/Backdrop';
import { GraphCustomer } from '@services/graphql';
import { createCustomerAddress, updateCustomerAddress, updatedDefaultAddress as gqlUpdateDefaulAddress } from '../services/graphql';
import ItemAddress from './ItemAddress';
import useStyles from './style';

// Main Render Page
const Content = (props) => {
    const { token } = props;
    // style
    const styles = useStyles();
    // graphql
    const [updatedDefaultAddress] = gqlUpdateDefaulAddress();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    const getCustomer = GraphCustomer.getCustomer(token);
    // state
    const [address, setAddress] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success, setSuccess] = useState(false);
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

    // didmount
    useEffect(() => {
        setLoading(true);
        if (!getCustomer.loading && getCustomer.data) {
            const { customer } = getCustomer.data;

            if (customer) {
                const selectedAddress = customer.addresses.find((address) => address.default_shipping);
                setSelectedAddressId(selectedAddress ? selectedAddress.id : null);
                setAddress(customer.addresses);
            }
        }
        setLoading(false);

        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, [getCustomer]);

    // handle open modal add adress button
    const handleDraweClick = () => {
        setDrawer(!drawer);
    };

    // handle change selected address
    const handleChange = async (event) => {
        setShowBackdrop(true);
        const addressId = parseInt(event.target.value);
        setSelectedAddressId(addressId);
        let detail = {};
        for (let index = 0; index < address.length; index++) {
            if (address[index].id === addressId) {
                detail = address[index];
            }
        }
        await updatedDefaultAddress({
            variables: {
                addressId,
                street: detail.street[0],
            },
        });
        await getCustomer.refetch();
        setShowBackdrop(false);
    };

    // handle edit address
    const handleDialogSubmit = async () => {
        setLoading(true);
        await getCustomer.refetch();
        setAddress(getCustomer.data.customer.addresses);
        setLoading(false);
    };

    // handle add address
    const handleAddress = async (data, type) => {
        setLoadingAddress(true);
        if (!success) {
            if (type === 'update') {
                await updateAddress({
                    variables: {
                        ...data,
                    },
                });
            } else {
                await addAddress({
                    variables: {
                        ...data,
                    },
                });
            }
        }

        setSuccess(true);
        setLoadingAddress(false);

        _.delay(() => {
            setDrawer(!drawer);
            handleDialogSubmit();
        }, 1000);
    };

    const getItemAddress = () => {
        let content;

        if (loading) {
            content = null;
        } else if (!address) {
            content = null;
        } else if (address.length === 0) {
            content = null;
        } else {
            content = address.map((item) => (
                <ItemAddress
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
                    onSubmitAddress={handleDialogSubmit}
                    {...props}
                />
            ));
        }

        return content;
    };

    const { t } = props;

    return (
        <>
            <Backdrop open={showBackdrop} />
            <Box>
                <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                    {getItemAddress()}
                </RadioGroup>
                <Box className={[styles.address_action].join(' ')}>
                    <Button variant="outlined" size="small" onClick={() => handleDraweClick()}>
                        <span style={{ marginRight: '15px' }}>{t('customer:address:addTitle')}</span>
                        <Add />
                    </Button>
                </Box>
            </Box>
            <AddressFormDialog
                {...props}
                onSubmitAddress={(data, type) => {
                    handleAddress(data, type);
                }}
                loading={loadingAddress}
                success={success}
                open={drawer}
                setOpen={() => setDrawer(!drawer)}
            />
        </>
    );
};

export default Content;
