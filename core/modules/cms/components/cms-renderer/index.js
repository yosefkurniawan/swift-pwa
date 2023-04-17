/* eslint-disable consistent-return */
import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import Box from '@material-ui/core/Box';

const WidgetRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer/WidgetRenderer'));
const MagezonRenderer = dynamic(() => import('@core_modules/cms/components/cms-renderer/MagezonRenderer'), {
    loading: () => <Box style={{ minHeight: '70vh' }} />,
});

const CmsRenderer = (props) => {
    const { content } = props;
    if (content.includes('[mgz_pagebuilder]')) {
        return <MagezonRenderer {...props} />;
    }
    return <WidgetRenderer {...props} />;
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.content;

export default memo(CmsRenderer, notRenderIf);
