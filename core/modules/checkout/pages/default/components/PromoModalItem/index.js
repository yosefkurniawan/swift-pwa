import ItemView from './view';

const PromoModalItem = (props) => {
    const {
        t, checkout, setCheckout,
    } = props;

    return (
        <ItemView
            {...props}
            checkout={checkout}
            setCheckout={setCheckout}
            t={t}
        />
    );
};

export default PromoModalItem;
