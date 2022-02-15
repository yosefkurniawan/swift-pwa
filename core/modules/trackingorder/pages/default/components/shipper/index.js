/* eslint-disable no-lonely-if */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */

import Typography from '@core_modules/commons/Typography';
import formatDate from '@helper_date';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from 'next/link';

const ShipperView = (props) => {
    // prettier-ignore
    const {
        data, orders, type, styles, t,
    } = props;

    const isLGX = type.toLowerCase().includes('logistix');
    const isJNE = type.toLowerCase().includes('jne');
    const isSAP = type.toLowerCase().includes('sap');
    const isShipperid = type.toLowerCase().includes('shipperid');
    const isAnteraja = type.toLowerCase().includes('anteraja');
    const isPopaket = type.toLowerCase().includes('popaket');
    const shipperData = {
        detail: {
            receiver_name: '',
            driver_name: '',
            driver_phone: '',
            shipper_name: '',
            description: '',
            update_date: '',
            last_status: '',
            live_tracking: '',
        },
    };
    let histories = [];

    if (isLGX) {
        const receiver_fullname = `${orders.data[0].detail[0].shipping_address.firstname} ${orders.data[0].detail[0].shipping_address.lastname}`;
        histories = data.data.shipmentTracking.trackingData[0]?.historyStatus || [];
        shipperData.detail = {
            ...shipperData.detail,
            receiver_name: receiver_fullname || 'unknown',
            driver_name: data.data.shipmentTracking.trackingData[0]?.driverInfo.name || 'unknown',
            driver_phone: data.data.shipmentTracking.trackingData[0]?.driverInfo.phoneNumber || 'unknown',
            description: histories[histories.length - 1]?.note || '',
            update_date: formatDate(histories[histories.length - 1].timestamp, 'DD-MM-YYYY HH:mm'),
            last_status: histories[histories.length - 1]?.status || '',
            live_tracking: data.data.shipmentTracking.trackingData[0].trackingUrl || '',
        };
    } else {
        const detail = isJNE ? data : isSAP || isShipperid ? data[data.length - 1] : isAnteraja ? data.content.order : isPopaket ? data[0] : {};
        histories = isJNE ? data.history : isSAP || isShipperid ? data : isAnteraja ? data.content.history : isPopaket ? data : [];

        if (isJNE) {
            shipperData.detail = {
                ...shipperData.detail,
                receiver_name: detail.detail[0].cnote_receiver_name || '',
                shipper_name: detail.detail[0].cnote_shipper_name || '',
                description: detail.cnote.keterangan || '',
                update_date: detail.detail[0].cnote_date || '',
                last_status: detail.cnote.last_status || '',
            };
        }

        if (isSAP) {
            shipperData.detail = {
                ...shipperData.detail,
                receiver_name: detail.receiver_name || '',
                description: detail.description || '',
                update_date: detail.create_date || '',
                last_status: detail.rowstate_name || '',
            };
        }

        if (isShipperid) {
            shipperData.detail = {
                ...shipperData.detail,
                description: <span dangerouslySetInnerHTML={{ __html: detail.logisticStatus[0].description }} /> || '',
                update_date: formatDate(detail.createdDate, 'DD-MM-YYYY HH:mm') || '',
                last_status: detail.trackStatus.description || '',
                live_tracking: detail.trackURL && detail.trackURL !== '' ? detail.trackURL : '',
            };
        }

        if (isAnteraja) {
            shipperData.detail = {
                ...shipperData.detail,
                receiver_name: detail?.receiver.name || '',
                shipper_name: detail?.shipper.name || '',
                update_date: histories ? formatDate(histories[histories.length - 1].timestamp, 'DD-MM-YYYY HH:mm') : '',
                last_status: histories ? histories[histories.length - 1].message.id : '',
            };
        }

        if (isPopaket) {
            shipperData.detail = {
                ...shipperData.detail,
                update_date: detail?.date ? formatDate(detail.date, 'DD-MM-YYYY HH:mm') : '',
                last_status: detail?.status || '',
                description: detail?.description || '',
            };
        }
    }

    return (
        <div className={styles.containerList}>
            <div className="trackingorder-detail">
                <Typography type="bold" variant="h3">
                    Detail
                </Typography>
                <div style={{ marginBottom: 30 }}>
                    {shipperData.detail.receiver_name !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:receiverName')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.receiver_name}</Typography>
                        </div>
                    )}
                    {shipperData.detail.driver_name !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:driverName')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.driver_name}</Typography>
                        </div>
                    )}
                    {shipperData.detail.driver_phone !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:driverPhone')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.driver_phone}</Typography>
                        </div>
                    )}
                    {shipperData.detail.shipper_name !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:shipperName')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.shipper_name}</Typography>
                        </div>
                    )}
                    {shipperData.detail.description !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:description')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.description}</Typography>
                        </div>
                    )}
                    {shipperData.detail.update_date !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:updateDate')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.update_date}</Typography>
                        </div>
                    )}
                    {shipperData.detail.last_status !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:lastStatus')}</Typography>
                            <Typography className="list-item__desc">{shipperData.detail.last_status}</Typography>
                        </div>
                    )}
                    {shipperData.detail.live_tracking !== '' && (
                        <div className="list-item">
                            <Typography className="list-item__title">Live Tracking</Typography>
                            <div className="list-item__desc track-link">
                                <Link href={shipperData.detail.live_tracking || '#'}>
                                    <a>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span>{t('trackingorder:track')}</span>
                                            <LaunchIcon fontSize="small" />
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="trackingorder-history">
                <Typography type="bold" variant="h3">
                    {t('trackingorder:history')}
                </Typography>

                {histories &&
                    histories.map((history, index) => {
                        let dateTime;
                        let description;

                        if (isLGX) {
                            dateTime = formatDate(new Date(history.timestamp * 1000), 'DD-MM-YYYY HH:mm').split(' ');
                            description = history.note;
                        } else {
                            if (isJNE) {
                                dateTime = history.date.split(' ');
                                description = history.desc;
                            } else if (isSAP) {
                                dateTime = history.create_date.split(' ');
                                description = history.description;
                            } else if (isShipperid) {
                                dateTime = formatDate(history.createdDate, 'DD-MM-YYYY HH:mm').split(' ');
                                description = <span dangerouslySetInnerHTML={{ __html: history.logisticStatus[0].description }} />;
                            } else if (isAnteraja) {
                                dateTime = formatDate(history.timestamp, 'DD-MM-YYYY HH:mm').split(' ');
                                description = history.message.id;
                            } else if (isPopaket) {
                                dateTime = formatDate(history.date, 'DD-MM-YYYY HH:mm').split(' ');
                                description = history.description;
                            }
                        }

                        return (
                            <div key={index} style={{ marginBottom: 10 }}>
                                <Typography type="bold">{`${dateTime[0]}, ${dateTime[1]}`}</Typography>
                                <Typography>{description}</Typography>
                            </div>
                        );
                    })}
            </div>
            <style jsx>
                {`
                    .trackingorder-detail :global(a:hover),
                    .trackingorder-history :global(a:hover) {
                        text-decoration: underline;
                    }
                    .list-item :global(.track-link) {
                        display: flex;
                        align-items: center;
                    }
                    .list-item :global(.track-link > *) {
                        background-color: #eee;
                        padding: 5px;
                        text-decoration: none !important;
                        border-radius: 5px;
                    }
                `}
            </style>
        </div>
    );
};

export default ShipperView;
