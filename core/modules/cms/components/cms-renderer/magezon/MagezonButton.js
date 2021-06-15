/* eslint-disable react/no-danger */
import React from 'react';
import Button from '@common_button';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';

const MagezonButton = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, title, link,
    } = props;
    let classes = '';
    if (xs_hide) classes += 'hidden-mobile ';
    if (sm_hide) classes += 'hidden-sm ';
    if (md_hide) classes += 'hidden-md ';
    if (lg_hide) classes += 'hidden-lg ';
    return (
        <div className={classes}>
            {
                link && link !== ''
                    ? (
                        <MagezonLink link={link}>

                            <Button className="magezon-button" type="button" align="left">
                                {title || ''}
                            </Button>
                        </MagezonLink>
                    )
                    : (

                        <Button className="magezon-button" type="button" align="left">
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
