import React from 'react';
import Item from './Item';
import Footer from '../components/Footer';
import useStyles from './style';

const ConfigurableView = (props) => {
    const {
        loading, disabled, showQty = true, handleAddToCart, qty, setQty,
        t, options, selectConfigurable, showAddToCart = true,
        catalogList = false, isGrid, ...other
    } = props;
    const styles = useStyles();

    const defaultConfigComponent = () => (
        <>
            {options.map((item, index) => (
                <Item
                    key={index}
                    option={item.options}
                    selected={selectConfigurable}
                    value={item.value}
                    {...other}
                />
            ))}
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

    if (catalogList) {
        if (isGrid) {
            return defaultConfigComponent();
        }
        return (
            <div className={styles.footerContainer}>
                <div className={styles.listOption}>
                    {options.map((item, index) => (
                        <Item
                            key={index}
                            option={item.options}
                            selected={selectConfigurable}
                            value={item.value}
                            {...other}
                        />
                    ))}
                </div>
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
            </div>
        );
    }
    return defaultConfigComponent();
};

export default ConfigurableView;
