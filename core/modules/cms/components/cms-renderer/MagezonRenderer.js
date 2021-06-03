import React from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';

const MagezonRenderer = (props) => {
    const { content } = props;
    let removeIdentifier = content.replace('[mgz_pagebuilder]', '');
    removeIdentifier = removeIdentifier.replace('[/mgz_pagebuilder]', '');
    removeIdentifier = JSON.parse(removeIdentifier);
    if (typeof window !== 'undefined') console.log(removeIdentifier);
    return (
        <div>
            {
                removeIdentifier && removeIdentifier.elements && removeIdentifier.elements.length > 0
              && removeIdentifier.elements.map((item, key) => (
                  <MagezonElement key={key} {...item} />
              ))
            }
        </div>
    );
};

export default MagezonRenderer;
