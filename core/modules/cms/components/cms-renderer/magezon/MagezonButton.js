/* eslint-disable react/no-danger */
import React from 'react';
import Button from '@common_button';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';

const MagezonButton = (props) => {
    const {
        xs_hide, sm_hide, button_size, md_hide, lg_hide, title, link, icon,
    } = props;
    let classes = '';
    if (xs_hide) classes += 'hidden-mobile ';
    if (sm_hide) classes += 'hidden-sm ';
    if (md_hide) classes += 'hidden-md ';
    if (lg_hide) classes += 'hidden-lg ';
    return (
        <div className={classes}>
            {link && link !== '' ? (
                <MagezonLink link={link}>
                    <Button className="magezon-button" type="button" align="left">
                        {icon !== '' ? <MagezonIcon icon={icon} icon_size={button_size} /> : null}
                        {title || ''}
                    </Button>
                </MagezonLink>
            ) : (
                <Button className="magezon-button" type="button" align="left">
                    {icon !== '' ? <MagezonIcon icon={icon} icon_size={button_size} /> : null}
                    {title || ''}
                </Button>
            )}
            <style jsx>
                {`
                `}
            </style>
        </div>
    );
};

export default MagezonButton;
