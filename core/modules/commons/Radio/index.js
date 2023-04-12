/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@common_typography';
import classNames from 'classnames';
import useStyles from '@common_radio/style';

const RadioItem = (props) => {
    const styles = useStyles();
    const { value, label, className } = props;
    const customStyle = classNames(styles.radioContainer, className);
    return (
        <FormControlLabel
            value={value || ''}
            control={<Radio color="default" size="small" />}
            label={label.replace(/_/g, ' ') || ''}
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
    noLabel,
    CustomItem,
    className = {},
    classContainer = {},
    classItem = {},
    flex = 'column',
    error = false,
    errorMessage = '',
    propsItem = {},
    disabled = false,
    CustomLabel,
    useLoadMore = false,
}) {
    const [more, setMore] = React.useState(7);
    const styles = useStyles();

    const rootStyle = classNames(styles.root, className);
    const containerStyle = classNames('radio-container', styles[flex], classContainer, styles.error);

    // handle load more and load less list data
    const handleMore = () => {
        setMore(more + 7);
    };

    const handleLess = () => {
        setMore(more - 7);
    };

    const handleChange = (event) => {
        !disabled && onChange(event.target.value);
    };

    const handleChangeCustom = (val) => {
        !disabled && onChange(val);
    };
    return (
        <div className={rootStyle}>
            {!noLabel ? (
                CustomLabel ? (
                    <CustomLabel />
                ) : (
                    <Typography variant="label" type="bold" letter="uppercase">
                        {label.replace(/_/g, ' ')}
                    </Typography>
                )
            ) : null}

            <RadioGroup
                aria-label={ariaLabel}
                name={name}
                value={value}
                onChange={handleChange}
                classes={{
                    root: containerStyle,
                }}
            >
                {
                    useLoadMore
                    // using load more button
                        ? valueData?.slice(0, more)?.map((item, index) => (CustomItem ? (
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
                        )))
                    // not using load more button
                        : valueData?.map((item, index) => (CustomItem ? (
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
                        )))
                }
            </RadioGroup>
            {
                useLoadMore && valueData.length > 7 && more <= 7 && (
                    <a onClick={handleMore} style={{ marginTop: '10px', textAlign: 'right' }}>
                        <Typography decoration="underline" variant="span">See more</Typography>
                    </a>
                )
            }
            {
                useLoadMore && more > 7 && (
                    <a onClick={handleLess} style={{ marginTop: '10px', textAlign: 'right' }}>
                        <Typography decoration="underline" variant="span">See less</Typography>
                    </a>
                )
            }
            {error && (
                <Typography variant="p" color="red">
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
}

export default CustomRadio;
