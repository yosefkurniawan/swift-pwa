import React from 'react';

const WidgetListProduct = (props) => {
    const { conditions_encoded } = props;
    const condition_object = conditions_encoded.split('/');
    console.log('condition_object', condition_object);
    return <div>WidgetListProduct</div>;
};

export default WidgetListProduct;
