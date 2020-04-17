import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import useStyles from './style';

const getVariant = (variant) => {
    const variantDefault = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
        'srOnly',
        'inherit',
    ];
    const variantCustom = {
        span: 'caption',
        title: 'h1',
        p: 'body1',
        label: 'caption',
    };
    if (variantDefault.indexOf(variant) > -1) {
        return variant;
    }
    return variantCustom[variant];
};

const CustomTypography = ({
    variant = 'span',
    type = 'regular',
    className = {},
    children,
    align = 'left',
    letter = '',
    decoration = '',
    color = '',
}) => {
    const styles = useStyles();
    const customStyle = classNames(
        styles.root,
        styles[letter],
        styles[variant],
        styles[type],
        styles[align],
        styles[decoration],
        styles[color],
        className,
    );
    const variantType = getVariant(variant);
    return (
        <Typography variant={variantType} className={customStyle} align={align}>
            {children}
        </Typography>
    );
};

CustomTypography.propTypes = {
    variant: PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'title',
        'label',
    ]),
    type: PropTypes.oneOf(['bold', 'italic', 'semiBold', 'regular']),
    letter: PropTypes.oneOf(['uppercase', 'capitalize', 'lowercase']),
    align: PropTypes.oneOf(['top', 'bottom', 'center', 'left']),
    decoration: PropTypes.oneOf(['underline']),
    color: PropTypes.oneOf(['red', 'green', 'orange', 'default']),
};

CustomTypography.defaultProps = {
    variant: 'span',
    type: 'regular',
    align: 'left',
    letter: '',
    decoration: '',
    color: '',
};

export default CustomTypography;
