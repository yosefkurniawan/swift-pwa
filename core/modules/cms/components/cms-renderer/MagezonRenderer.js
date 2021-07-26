import React from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';

const MagezonRenderer = (props) => {
    const { content, storeConfig, ...other } = props;
    let removeIdentifier = content.replace('[mgz_pagebuilder]', '');
    removeIdentifier = removeIdentifier.replace('[/mgz_pagebuilder]', '');
    removeIdentifier = JSON.parse(removeIdentifier);
    return (
        <>
            {
                removeIdentifier && removeIdentifier.elements && removeIdentifier.elements.length > 0
              && removeIdentifier.elements.map((item, key) => (
                  <MagezonElement key={key} {...other} {...item} storeConfig={storeConfig} />
              ))
            }
        </>
    );
};

export default MagezonRenderer;
