import React from 'react';
import Item from './Item';
import Footer from '../components/Footer';
import useStyles from './style';

const ConfigurableView = (props) => {
    const {
        loading, disabled, showQty = true, handleAddToCart, qty, setQty,
        t, options, selectConfigurable, showAddToCart = true, isGrid, ...other
    } = props;
    const styles = useStyles();
    if (isGrid) {
        return (
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
};

export default ConfigurableView;
