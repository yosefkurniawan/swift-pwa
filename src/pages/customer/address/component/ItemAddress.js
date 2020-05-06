/* eslint-disable no-unused-vars */
import { FormControlLabel, Box, Radio } from '@material-ui/core';
import Typography from '@components/Typography';
import AddressFormDialog from '@components/AddressFormDialog';
import React, { useState } from 'react';
import _ from 'lodash';
import useStyles from './style';
import { createCustomerAddress, updateCustomerAddress } from '../services/graphql';

const ItemAddress = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        value = '',
        checked = false,
        onSubmitAddress,
        customAttributes,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const styles = useStyles();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    return (
        <>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={async (data, type) => {
                    setLoading(true);

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
                    setLoading(false);

                    _.delay(() => {
                        setOpen(!open);
                        onSubmitAddress();
                    }, 1000);
                }}
                loading={loading}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle="editTitle"
            />
            <Box className="column">
                <Box className={[styles.address_content].join(' ')}>
                    <FormControlLabel
                        className={[styles.address_shipping].join(' ')}
                        value={value}
                        checked={checked}
                        control={<Radio color="primary" size="small" />}
                        label={(
                            <>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {`${firstname} ${lastname}`}
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {street}
                                    ,
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {city !== '' && `${city}, `}
                                    {region !== '' && `${region}, `}
                                    {country !== '' && `${country}, `}
                                    {postcode !== '' && postcode}
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {telephone}
                                </Typography>
                            </>
                        )}
                        labelPlacement="end"
                    />
                    <Typography className={[styles.address_edit].join(' ')} variant="span" onClick={() => setOpen(!open)}>
                        Edit Address
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default ItemAddress;
