import React, { useState } from 'react';
import { checkoutAgreements } from '@core_modules/checkout/services/graphql';

const Confirmation = (props) => {
    const {
        t, checkout, setCheckout, storeConfig, ConfirmationView
    } = props;

    const { data: agreements } = checkoutAgreements();
    const [state] = useState(false);
    
    const handleChange = async (value) => {
        let isAgree = false;
        
        if (value.length > 0) {
            isAgree = true;
        } else {
            isAgree = false;
        }
        
        checkout.confirmation =isAgree;
        await setCheckout(checkout);
    };

    return (
        <ConfirmationView
            agreements={agreements}
            state={state}
            storeConfig={storeConfig}
            t={t}
            handleChange={handleChange}
        />
    );
};

export default Confirmation;
