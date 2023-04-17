import React from 'react';
import dynamic from 'next/dynamic';
import Box from '@material-ui/core/Box';

import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';

const WidgetRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer/WidgetRenderer'));

const MixedContent = (props) => {
    const {
        key, storeConfig, contents, ...item
    } = props;

    return (
        <>
            {contents[0] !== '' && <WidgetRenderer content={contents[0]} {...item} storeConfig={storeConfig} />}
            <MagezonElement {...item} storeConfig={storeConfig} />
            {contents[2] !== '' && <WidgetRenderer content={contents[2]} {...item} storeConfig={storeConfig} />}
        </>
    );
};

const MagezonRenderer = (props) => {
    const { content, storeConfig } = props;
    const mixedContents = content.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
    const removeIdentifier = JSON.parse(mixedContents[1]);

    return (
        <Box style={{ minHeight: '70vh' }}>
            {removeIdentifier?.elements.map((item, key) => {
                if (mixedContents[0] !== '' || mixedContents[2] !== '') {
                    return <MixedContent key={key} {...item} storeConfig={storeConfig} contents={mixedContents} />;
                }
                return <MagezonElement key={key} {...item} storeConfig={storeConfig} />;
            })}
        </Box>
    );
};

export default MagezonRenderer;
