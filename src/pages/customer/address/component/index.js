/* eslint-disable consistent-return */
// Library
import AddressFormDialog from '@components/AddressFormDialog';
import Button from '@components/Button';
import { Box, RadioGroup } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { getCustomer as gqlGetCustomer } from '../../../../pages/checkout/services/graphql';
import { createCustomerAddress, updateCustomerAddress, updatedDefaultAddress as gqlUpdateDefaulAddress } from '../services/graphql';
import ItemAddress from './ItemAddress';
import useStyles from './style';

// Main Render Page
const Content = (props) => {
    // style
    const styles = useStyles();
    // graphql
    const getCustomer = gqlGetCustomer();
    const [updatedDefaultAddress] = gqlUpdateDefaulAddress();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    // state
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [, setMapPosition] = useState({
        lat: -6.197361,
        lng: 106.774535,
    });

    // didmount
    useEffect(() => {
        setLoading(true);
        if (!getCustomer.loading && getCustomer.data) {
            const customer = getCustomer.data.customer;

            if (customer) {
                const selectedAddress = customer.addresses.find((address) => address.default_shipping);

                if (selectedAddress) {
                    setSelectedAddress(selectedAddress.id);
                }

                setAddress(customer.addresses);
            }
        }
        setLoading(false);

        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, [getCustomer]);

    // method
    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setMapPosition({
            lat,
            lng,
        });
    };

    // handle open modal add adress button
    const handleDraweClick = () => {
        setDrawer(!drawer);
    };

    // handle change selected address
    const handleChange = async (event) => {
        const addressId = event.target.value;
        setSelectedAddress(addressId);
        await updatedDefaultAddress({ variables: { addressId: addressId } });
        await getCustomer.refetch();
        setAddress(getCustomer.data.addresses);
    };

    // handle add address
    const handleAddress = async (data, type) => {
        setLoadingAddress(true);

        if (!success) {
            if (type == 'update') {
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

    // handle edit address
    const handleDialogSubmit = async () => {
        setLoading(true);
        await getCustomer.refetch();
        setAddress(getCustomer.data.customer.addresses);
        setLoading(false);
    };

    return (
        <>
            <Box>
                <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddress}>
                    {loading
                        ? null
                        : !address
                        ? null
                        : address.length == 0
                        ? null
                        : address.map((item, index) => (
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
