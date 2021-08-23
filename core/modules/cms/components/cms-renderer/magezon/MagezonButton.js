/* eslint-disable react/no-danger */
import React from 'react';
import Button from '@common_button';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonButton = (props) => {
    const {
        button_size, title, link, icon, icon_position, onClick = () => {},
        button_align,
    } = props;
    const classes = useStyles(props);
    const wrapper = 'mgz-button';
    let isLeftIconPosition = '';

    if (icon_position) {
        if (icon_position === 'left') {
            isLeftIconPosition = true;
        } else {
            isLeftIconPosition = false;
        }
    }

    return (
        <div className={wrapper}>
            {link && link !== '' ? (
                <MagezonLink link={link}>
                    <Button className={classes.button} type="button" align={`${button_align || 'left'}`} onClick={onClick}>
                        {icon && isLeftIconPosition ? <MagezonIcon icon={icon} icon_size={button_size} /> : null}
                        {title || ''}
                        {icon && !isLeftIconPosition ? <MagezonIcon icon={icon} icon_size={button_size} /> : null}
                    </Button>
                </MagezonLink>
            ) : (
                <Button className={classes.button} type="button" align={`${button_align || 'left'}`} onClick={onClick}>
                    {icon ? <MagezonIcon icon={icon} icon_size={button_size} /> : null}
                    {title || ''}
                </Button>
            )}
            <style jsx global>
                {`
                    .magezone {
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonButton;
