import React from 'react';
import Item from '@plugin_optionitem/ConfigurableOption/Item';
import Footer from '@plugin_optionitem/components/Footer';

const ConfigurableView = (props) => {
    const {
        loading, disabled, showQty = true, handleAddToCart, qty, setQty,
        t, options, selectConfigurable, showAddToCart = true, isGrid = true,
        ...other
    } = props;
    return (
        <>
            {options.map((item, index) => (
                <Item
                    key={index}
                    option={item.options}
                    selected={selectConfigurable}
                    value={item.value}
                    isGrid={isGrid}
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
