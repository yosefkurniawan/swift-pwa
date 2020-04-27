import React from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import Typography from '@components/Typography';
import classNames from 'classnames';
import useStyles from './style';

const RadioItem = (props) => {
    const styles = useStyles();
    const { value, label, className } = props;
    const customStyle = classNames(styles.radioContainer, className);
    return (
        <FormControlLabel
            value={value || ''}
            control={<Radio color="default" size="small" />}
            label={label || ''}
            className={customStyle}
        />
    );
};

// Inspired by blueprintjs
function CustomRadio({
    valueData = [],
    onChange = () => {},
    value = '',
    name = 'radio',
    ariaLabel = 'radio',
    label = '',
    CustomItem,
    className = {},
    classContainer = {},
    classItem = {},
    flex = 'column',
    propsItem = {},
}) {
    const styles = useStyles();

    const rootStyle = classNames(styles.root, className);
    const containerStyle = classNames(styles[flex], classContainer);

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const handleChangeCustom = (val) => {
        onChange(val);
    };
    return (
        <div className={rootStyle}>
            <Typography variant="label" type="bold" letter="uppercase">
                {label}
            </Typography>
            <RadioGroup
                aria-label={ariaLabel}
                name={name}
                value={value}
                // onChange={handleChange}
                className={containerStyle}
            >
                {valueData.map((item, index) => (CustomItem ? (
                    <CustomItem
                        key={index}
                        {...item}
                        selected={JSON.stringify(value) === JSON.stringify(item.value)}
                        onChange={handleChangeCustom}
                        className={classItem}
                        {...propsItem}
                    />
                ) : (
                    <RadioItem key={index} {...item} {...propsItem} className={classItem} />
                )))}
            </RadioGroup>
        </div>
    );
}

export default CustomRadio;
