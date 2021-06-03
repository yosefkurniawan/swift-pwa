/* eslint-disable react/no-danger */
import React from 'react';

const MagezonText = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, content,
    } = props;
    let classes = '';
    if (xs_hide) classes += 'hidden-mobile ';
    if (sm_hide) classes += 'hidden-sm ';
    if (md_hide) classes += 'hidden-md ';
    if (lg_hide) classes += 'hidden-lg ';
    return (
        <div className={classes}>
            <div className="magezone-text" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default MagezonText;
