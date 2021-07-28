import React from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonRow = (props) => {
    const {
        elements, xs_hide, sm_hide, md_hide, lg_hide, storeConfig,
    } = props;
    const classes = useStyles(props);
    let classRow = 'row ';
    if (xs_hide) classRow += 'hidden-mobile ';
    if (sm_hide) classRow += 'hidden-sm ';
    if (md_hide) classRow += 'hidden-md ';
    if (lg_hide) classRow += 'hidden-lg ';
    return (
        <div className={`${classes.container} ${classRow}`}>
            {elements && elements.length > 0 && elements.map((item, key) => <MagezonElement key={key} {...item} storeConfig={storeConfig} />)}
        </div>
    );
};

export default MagezonRow;
