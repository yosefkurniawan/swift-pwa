import React from 'react';
import dynamic from 'next/dynamic';

// import Item from '@plugin_optionitem/ConfigurableOption/Item';
// import Footer from '@plugin_optionitem/components/Footer';

const Item = dynamic(() => import('@plugin_optionitem/ConfigurableOption/Item'), { ssr: true });
const Footer = dynamic(() => import('@plugin_optionitem/components/Footer'), { ssr: true });

const ConfigurableView = (props) => {
    const {
        loading, disabled, showQty = true, handleAddToCart, qty, setQty,
        t, options, selectConfigurable, showAddToCart = true, isGrid = true,
        showSwatches = true, customPos = false,
        ...other
    } = props;
    const updatedOptions = customPos ? [...options].sort((a, b) => a.options.position - b.options.position) : options;

    return (
        <>
            {showSwatches && updatedOptions.map((item, index) => (
                <Item
                    key={index}
                    option={item.options}
                    selected={selectConfigurable}
                    value={item.value}
                    isGrid={isGrid}
                    {...other}
                    className={`product-configurableOption-${item.options.label}`}
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
