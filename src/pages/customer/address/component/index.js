/* eslint-disable consistent-return */
// Library
import Button from '@components/Button';
import { Box, RadioGroup } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import AddAddressDialog from './AddDialog';
import ItemAddress from './ItemAddress';
import useStyles from './style';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const [address] = useState([
        {
            firstname: 'John',
            lastname: 'Doe',
            street: ['123 Elm Street'],
            city: 'Anytown',
            region: {
                region_code: 'MI',
                region: 'Michigan',
            },
            postcode: '78758',
            country_code: 'US',
            telephone: '512 555-1212',
        },
    ]);
    const [drawer, setDrawer] = useState(true);

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
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, []);

    return (
        <>
            <Box>
                <RadioGroup row aria-label="position" name="position" defaultValue={0}>
                    {address.map((item, index) => (
                        <ItemAddress
                            key={index}
                            firstName={item.firstname}
                            phoneNumber={item.telephone}
                            posCode={item.postcode}
                            state={item.region.region}
                            city={item.city}
                            country={item.country_code}
                            street={item.street.join(' ')}
                            value={index}
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
