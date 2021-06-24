import React from 'react';
import Typography from '@common_typography';
import { modules } from '@config';
import useStyles from '@core_modules/paypal/pages/review/components/ShippingAddress/style';
import classNames from 'classnames';
// import Link from 'next/link';

const ShippingAddress = (props) => {
    const { t } = props;
    let paypalData = {};
    if (typeof window !== 'undefined') {
        paypalData = JSON.parse(localStorage.getItem(modules.checkout.paypal.keyData));
    }
    // const paypalData = getLocalStorage(modules.checkout.paypal.keyData);
    let paypallShippingAddress = {};
    if (paypalData && paypalData.details && paypalData.details.purchase_units
        && paypalData.details.purchase_units.length && paypalData.details.purchase_units[0].shipping) {
        paypallShippingAddress = paypalData.details.purchase_units[0].shipping;
    }

    const styles = useStyles();

    return (
        <div className="row">
            <div className="col-xs-12">
                <Typography variant="span" letter="capitalize" type="bold">
                    {t('checkout:shippingAddress')}
                </Typography>
            </div>
            <div className={classNames('col-xs-12', styles.detail)}>
                {
                    paypallShippingAddress && paypallShippingAddress.name && (
                        <Typography variant="span" letter="capitalize">
                            {paypallShippingAddress.name.full_name}
                        </Typography>
                    )
                }
                {
                    paypallShippingAddress && paypallShippingAddress.address && (
                        <>
                            <Typography variant="span" letter="capitalize">
                                {paypallShippingAddress.address.address_line_1 || ''}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {paypallShippingAddress.address.address_line_2 || ''}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {`
                                    ${`${paypallShippingAddress.address.admin_area_2}, ` || ''}
                                    ${`${paypallShippingAddress.address.admin_area_1}, ` || ''}
                                    ${`${paypallShippingAddress.address.postal_code}` || ''}
                                `}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {paypallShippingAddress.address.country_code || ''}
                            </Typography>
                        </>
                    )
                }
            </div>
            {/* <div className="col-xs-12">
                <Link href={initialOptionPaypal.editUrl || ''}>
                    <a>
                        <Typography variant="span" letter="capitalize">
                            {t('common:button:edit')}
                        </Typography>
                    </a>
                </Link>
            </div> */}
        </div>
    );
};

export default ShippingAddress;
