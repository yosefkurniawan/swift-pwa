import React from 'react';
import View from '@core_modules/checkout/pages/default/components/ModalXendit/view';
import { modules } from '@config';
import { getStoreHost } from '@helper_config';
import { getAppEnv } from '@root/core/helpers/env';

const ModalXendit = (props) => {
    const { payment_code, order_id } = props;
    const handleCloseXendit = () => {
        if (modules.checkout.xendit.paymentPrefixCodeOnSuccess.includes(payment_code)) {
            window.location.replace('/checkout/onepage/success');
        } else {
            window.location.replace(`${getStoreHost(getAppEnv())}xendit/checkout/failure?order_id=${order_id}`);
        }
    };
    return (
        <View
            handleCloseXendit={handleCloseXendit}
            {...props}
        />
    );
};

export default ModalXendit;
