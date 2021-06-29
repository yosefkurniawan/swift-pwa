const ShipperAnterAja = (props) => {
    const {
        nameReceiver, description, updateDate, styles, t,
    } = props;
    return (
        <div className={styles.containerList}>
            <div className="list-item">
                <p className="list-item__title">{t('trackingorder:name')}</p>
                <p className="list-item__desc">{nameReceiver}</p>
            </div>
            <div className="list-item">
                <p className="list-item__title">{t('trackingorder:description')}</p>
                <p className="list-item__desc">{description}</p>
            </div>
            <div className="list-item">
                <p className="list-item__title">{t('trackingorder:updateDate')}</p>
                <p className="list-item__desc">{updateDate}</p>
            </div>
        </div>
    );
};

export default ShipperAnterAja;
