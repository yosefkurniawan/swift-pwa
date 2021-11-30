/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { checkoutAgreements } from '@core_modules/checkout/services/graphql';

const Confirmation = (props) => {
    const {
        t, storeConfig, ConfirmationView, data
    } = props;

    const { loading, data: agreements } = checkoutAgreements();
    

    const [state, setState] = React.useState({});
    
    const handleChange = async (key, value) => {
        const newState = { ...state, [key]: value };
        await setState(newState);
        const keyState = Object.keys(newState);
        const select_options = [];
        for (let index = 0; index < keyState.length; index += 1) {
            if (Array.isArray(newState[keyState[index]])) {
                const options = newState[keyState[index]].map((option) => {
                    const val = JSON.parse(option);
                    return {
                        label: val.label,
                        option_id: val.option_id,
                    };
                });
                select_options.push(...options);
                if (!options || options.errors) {
                    handleOpenMessage({
                        variant: 'error',
                        text: t('checkout:message:problemConnection'),
                    });
                    setLoad(false);
                }
            }
        }
    };
    return (
        <ConfirmationView
            agreements={agreements}
            state={state}
            storeConfig={storeConfig}
            t={t}
            handleChange={handleChange}
            loading={loading}
        />
    );


    return null;
};

export default Confirmation;
