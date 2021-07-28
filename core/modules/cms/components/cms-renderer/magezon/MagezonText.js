/* eslint-disable react/no-danger */
import React from 'react';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonText = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, content, ...other
    } = props;
    const classes = useStyles(props);
    let textWrapper = '';
    if (xs_hide) textWrapper += 'hidden-mobile ';
    if (sm_hide) textWrapper += 'hidden-sm ';
    if (md_hide) textWrapper += 'hidden-md ';
    if (lg_hide) textWrapper += 'hidden-lg ';
    return (
        <div className={`${classes.container} ${textWrapper}`}>
            <WidgetRenderer content={content} {...other} />
        </div>
    );
};

export default MagezonText;
