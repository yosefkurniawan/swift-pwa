/* eslint-disable react/no-danger */
import React from 'react';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';

const MagezonStaticBlockView = (props) => {
    const {
        xs_hide, sm_hide, button_size, md_hide, lg_hide,
        content, ...other
    } = props;
    const classes = useStyles(other);
    let className = 'cms-container ';
    if (xs_hide) className += 'hidden-mobile ';
    if (sm_hide) className += 'hidden-sm ';
    if (md_hide) className += 'hidden-md ';
    if (lg_hide) className += 'hidden-lg ';

    return (
        <div className={`${classes?.container} ${className}`}>
            <CmsRenderer content={content} {...props} {...other} />
        </div>
    );
};

export default MagezonStaticBlockView;
