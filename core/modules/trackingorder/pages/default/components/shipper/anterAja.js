const ShipperAnterAja = (props) => {
    const {
        nameReceiver, description, updateDate, styles,
    } = props;
    return (
        <div className={styles.containerList}>
            <div className="list-item">
                <p className="list-item__title">Name</p>
                <p className="list-item__desc">{nameReceiver}</p>
            </div>
            <div className="list-item">
                <p className="list-item__title">Description</p>
                <p className="list-item__desc">{description}</p>
            </div>
            <div className="list-item">
                <p className="list-item__title">updateDate</p>
                <p className="list-item__desc">{updateDate}</p>
            </div>
        </div>
    );
};

export default ShipperAnterAja;
