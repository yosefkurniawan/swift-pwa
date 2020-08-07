/* eslint-disable no-unused-vars */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import AddressFormDialog from '@core/customer/plugins/AddressFormDialog';
import React, { useState } from 'react';
import _ from 'lodash';
import useStyles from './style';
import { createCustomerAddress, updateCustomerAddress } from '../../../services/graphql';

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
        handleAddress,
        loadingAddress,
        success,
        t,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const [open, setOpen] = useState(false);
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);
    const styles = useStyles();
    return (
        <>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle={t('customer:address:editTitle')}
            />
            <div className={styles.addressColumn}>
                <div className={[styles.address_content].join(' ')}>
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
                        {t('customer:address:editTitle')}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default ItemAddress;
