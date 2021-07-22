import React from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';

const WsiwygContent = (props) => {
    const { content } = props;
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

const MixedContent = (props) => {
    const {
        key, storeConfig, contents, ...item
    } = props;

    return (
        <>
            {contents[0] !== '' && <WsiwygContent content={contents[0]} />}
            <MagezonElement {...item} storeConfig={storeConfig} />
            {contents[2] !== '' && <WsiwygContent content={contents[2]} />}
        </>
    );
};

const MagezonRenderer = (props) => {
    const { content, storeConfig } = props;
    const mixedContents = content.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
    const removeIdentifier = JSON.parse(mixedContents[1]);

    return (
        <>
            {
                removeIdentifier && removeIdentifier.elements && removeIdentifier.elements.length > 0
              && removeIdentifier.elements.map((item, key) => (
                  mixedContents[0] !== '' || mixedContents[2] !== ''
                      ? <MixedContent key={key} {...item} storeConfig={storeConfig} contents={mixedContents} />
                      : <MagezonElement key={key} {...item} storeConfig={storeConfig} />
              ))
            }
        </>
    );
};

export default MagezonRenderer;
