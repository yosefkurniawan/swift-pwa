/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */

import Typography from '@core_modules/commons/Typography';
import formatDate from '@helper_date';
import Link from 'next/link';
import LaunchIcon from '@material-ui/icons/Launch';

const ShipperView = (props) => {
    // prettier-ignore
    const {
        data, type, styles, t,
    } = props;

    const isJNE = type === 'JNE';
    const isSAP = type === 'SAP';
    const isShipperid = type.toLowerCase().includes('shipperid');
    const isAnteraja = type.toLowerCase().includes('anteraja');
    const histories = isJNE ? data.history : isSAP || isShipperid ? data : isAnteraja ? data.content.history : [];
    const detail = isJNE ? data : isSAP || isShipperid ? data[data.length - 1] : isAnteraja ? data.content.order : {};

    return (
        <div className={styles.containerList}>
            <div className="trackingorder-detail">
                <Typography type="bold" variant="h3">
                    Detail
                </Typography>
                <div style={{ marginBottom: 30 }}>
                    {!isShipperid && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:receiverName')}</Typography>
                            <Typography className="list-item__desc">
                                {isJNE ? detail.detail[0].cnote_receiver_name : isSAP ? detail.receiver_name : isAnteraja ? detail.receiver.name : ''}
                            </Typography>
                        </div>
                    )}
                    {(isJNE || isAnteraja) && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:shipperName')}</Typography>
                            <Typography className="list-item__desc">{isJNE ? detail.detail[0].cnote_shipper_name : detail.shipper.name}</Typography>
                        </div>
                    )}
                    {!isAnteraja && (
                        <div className="list-item">
                            <Typography className="list-item__title">{t('trackingorder:description')}</Typography>
                            <Typography className="list-item__desc">
                                {isJNE ? (
                                    detail.cnote.keterangan
                                ) : isSAP ? (
                                    detail.description
                                ) : isShipperid ? (
                                    <span dangerouslySetInnerHTML={{ __html: detail.logisticStatus[0].description }} />
                                ) : (
                                    ''
                                )}
                            </Typography>
                        </div>
                    )}
                    <div className="list-item">
                        <Typography className="list-item__title">{t('trackingorder:updateDate')}</Typography>
                        <Typography className="list-item__desc">
                            {isJNE
                                ? detail.detail[0].cnote_date
                                : isSAP
                                    ? detail.create_date
                                    : isShipperid
                                        ? formatDate(detail.createdDate, 'DD-MM-YYYY HH:mm')
                                        : isAnteraja
                                            ? formatDate(histories[histories.length - 1].timestamp, 'DD-MM-YYYY HH:mm')
                                            : ''}
                        </Typography>
                    </div>
                    <div className="list-item">
                        <Typography className="list-item__title">{t('trackingorder:lastStatus')}</Typography>
                        <Typography className="list-item__desc">
                            {isJNE
                                ? detail.cnote.last_status
                                : isSAP
                                    ? detail.rowstate_name
                                    : isShipperid
                                        ? detail.trackStatus.description
                                        : isAnteraja
                                            ? histories[histories.length - 1].message.id
                                            : ''}
                        </Typography>
                    </div>
                    {isShipperid && detail.trackURL && (
                        <div className="list-item">
                            <Typography className="list-item__title">Live Tracking</Typography>
                            <div className="list-item__desc track-link">
                                <Link href={detail.trackURL || '#'}>
                                    <a>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span>Track</span>
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

                {histories.map((history, index) => {
                    let dateTime;
                    if (isJNE) dateTime = history.date.split(' ');
                    if (isSAP) dateTime = history.create_date.split(' ');
                    if (isShipperid) {
                        dateTime = formatDate(history.createdDate, 'DD-MM-YYYY HH:mm').split(' ');
                    }
                    if (isAnteraja) dateTime = formatDate(history.timestamp, 'DD-MM-YYYY HH:mm').split(' ');

                    return (
                        <div key={index} style={{ marginBottom: 10 }}>
                            <Typography type="bold">{`${dateTime[0]}, ${dateTime[1]}`}</Typography>
                            <Typography>
                                {isJNE ? (
                                    history.desc
                                ) : isSAP ? (
                                    history.description
                                ) : isShipperid ? (
                                    <span dangerouslySetInnerHTML={{ __html: history.logisticStatus[0].description }} />
                                ) : isAnteraja ? (
                                    history.message.id
                                ) : (
                                    ''
                                )}
                            </Typography>
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
