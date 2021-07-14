/* eslint-disable react/no-danger */
import React from 'react';
import Button from '@common_button';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonButton = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, title, link,
    } = props;
    const classes = useStyles(props);
    let wrapper = '';
    if (xs_hide) wrapper += 'hidden-mobile ';
    if (sm_hide) wrapper += 'hidden-sm ';
    if (md_hide) wrapper += 'hidden-md ';
    if (lg_hide) wrapper += 'hidden-lg ';
    return (
        <div className={wrapper}>
            {
                link && link !== ''
                    ? (
                        <MagezonLink link={link}>

                            <Button className={classes.button} type="button" align="left">
                                {title || ''}
                            </Button>
                        </MagezonLink>
                    )
                    : (

                        <Button className={classes.button} type="button" align="left">
                            {title || ''}
                        </Button>
                    )
            }
            <style jsx>
                {`
                    
                `}
            </style>
        </div>
    );
};

export default MagezonButton;
