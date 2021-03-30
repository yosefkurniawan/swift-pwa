import React from 'react';
import Item from './Item';
import Footer from '../components/Footer';

const ConfigurableView = (props) => {
    const {
        loading, disabled, showQty = true, handleAddToCart, qty, setQty,
        t, options, selectConfigurable, showAddToCart = true, ...other
    } = props;
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
};

export default ConfigurableView;
