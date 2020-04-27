/* eslint-disable consistent-return */
// Library
import Button from '@components/Button';
import { Box, RadioGroup } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import AddAddressDialog from './AddDialog';
import ItemAddress from './ItemAddress';
import useStyles from './style';
import gqlService from '../../../../pages/checkout/services/graphql';
import gqlServiceLocal from '../services/graphql';

// Main Render Page
const Content = (props) => {
    const { token } = props;
    const getCustomer = gqlService.getCustomer(null, token);
    const [updateCustomerAddress] = gqlServiceLocal.updateCustomerAddress(null, token)
    const styles = useStyles();
    const [address, setAddress] = useState([
        // {
        //     firstname: 'John',
        //     lastname: 'Doe',
        //     street: ['123 Elm Street'],
        //     city: 'Anytown',
        //     region: {
        //         region_code: 'MI',
        //         region: 'Michigan',
        //     },
        //     postcode: '78758',
        //     country_code: 'US',
        //     telephone: '512 555-1212',
        // },
    ]);
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [drawer, setDrawer] = useState(false);

    const [, setMapPosition] = useState({
        lat: -6.197361,
        lng: 106.774535,
    });

    useEffect(() => {
        console.log(getCustomer.data)
        if (!getCustomer.loading && getCustomer.data) {
            const customer = getCustomer.data.customer;
            const selectedAddress = customer.addresses.find(address => address.default_shipping)
            setSelectedAddress(selectedAddress.id)
            setAddress(customer.addresses)
        }
    }, [getCustomer]);

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
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, []);

    const handleChange = async (event) => {
        const addressId = event.target.value;
        console.log(addressId)
        await updateCustomerAddress({variables:{addressId: addressId}})
        setSelectedAddress(addressId)
    }

    return (
        <>
            <Box>
                <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddress}>
                    {address.length == 0 ? null:address.map((item, index) => (
                        <ItemAddress
                            checked={item.id == selectedAddress}
                            key={item.id}
                            firstName={item.firstname}
                            lastName={item.lastname}
                            phoneNumber={item.telephone}
                            posCode={item.postcode}
                            state={item.region.region}
                            city={item.city}
                            country={item.country_code}
                            street={item.street.join(' ')}
                            value={item.id}
                            {...props}
                        />
                    ))}
                </RadioGroup>
                <Box className={[styles.address_action].join(' ')}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDraweClick()}
                    >
                        <span style={{ marginRight: '15px' }}>Add New Address</span>
                        <Add />
                    </Button>
                </Box>
            </Box>
            <AddAddressDialog
                {...props}
                open={drawer}
                setOpen={() => setDrawer(!drawer)}
            />
        </>
    );
};

export default Content;
