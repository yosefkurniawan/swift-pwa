import Footer from '@plugin_optionitem/components/Footer';

const AwGiftCardProduct = (props) => {
    const {
        qty = 1,
        setQty = () => {},
        handleAddToCart = () => {},
        t,
        loading = false,
        disabled = false,
        showQty = true,
        showAddToCart = true,
        ...other
    } = props;
    return (
        <>
            <>Hei</>
            <Footer
                loading={loading}
                disabled={disabled}
                showQty={showQty}
                handleAddToCart={handleAddToCart}
                qty={qty}
                setQty={setQty}
                t={t}
                showAddToCart={showAddToCart}
                {...other}
            />
        </>
    );
};

export default AwGiftCardProduct;
