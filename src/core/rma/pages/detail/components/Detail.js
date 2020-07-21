import Typography from '@common_typography';
import React from 'react';
import formatDate from '@helpers/date';

const DetailComponents = ({ detail_rma, t }) => (
    <>
        <Typography variant="title" letter="uppercase" type="bold">
            Status
        </Typography>
        <Typography variant="span">{detail_rma.status.name}</Typography>
        <Typography variant="title" letter="uppercase" type="bold">
            {t('rma:view:orderDate')}
        </Typography>
        <Typography variant="span">{formatDate(detail_rma.order_date)}</Typography>
        <Typography variant="title" letter="uppercase" type="bold">
            Order
        </Typography>
        <Typography variant="span">
            #
            {detail_rma.order_number}
        </Typography>
        <Typography variant="title" letter="uppercase" type="bold">
            {t('rma:view:myAddress')}
        </Typography>
        <Typography variant="span" align="center">
            {detail_rma.customer_address.firstname || ''}
            <br />
            {detail_rma.customer_address.street || ''}
            <br />
            {detail_rma.customer_address.city || ''}
            <br />
            {detail_rma.customer_address.region || ''}
            <br />
            {detail_rma.customer_address.country_id || ''}
            <br />
            {detail_rma.customer_address.telephone || ''}
            <br />
            {detail_rma.customer_address.postcode || ''}
        </Typography>
    </>
);

export default DetailComponents;
