/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Typography from '@common_typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'classnames';
import useStyles from '@common_checkbox/style';

const CheckDefault = ({
    label = '',
    name = '',
    value = '',
    dataValues = [],
    onChange = () => {},
    disabled,
}) => {
    const checked = dataValues.indexOf(value) !== -1;
    const handleChange = () => {
        onChange(value);
    };
    return (
        <FormControlLabel
            disabled={disabled}
            control={(
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={name}
                    color="primary"
                    size="small"
                />
            )}
            label={label.replace(/_/g, ' ')}
        />
    );
};

const CustomCheckbox = ({
    label = 'label',
    data = [],
    value = [],
    flex = 'row',
    CustomItem,
    noLabel,
    disabled = false,
    onChange = () => {},
    className = {},
    useLoadMore = false,
}) => {
    const styles = useStyles();
    const [selected, setSelected] = React.useState(value);
    const [more, setMore] = React.useState(7);
    const checkStyle = classNames('checkbox-container', styles.checkboxContainer, styles[flex], className);

    // handle load more and load less list data
    const handleMore = () => {
        setMore(more + 7);
    };

    const handleLess = () => {
        setMore(more - 7);
    };

    // change value from parent => change state selected
    React.useEffect(() => { setSelected(value); }, [value]);

    // eslint-disable-next-line no-shadow
    const setCheckedFilter = (value) => {
        if (selected.indexOf(value) !== -1) {
            selected.splice(selected.indexOf(value), 1);
        } else {
            selected.push(value);
        }
        onChange(selected);
        setSelected([...selected]);
    };
    return (
        <div className={styles.container}>
            {!noLabel ? (
                <Typography variant="label" type="bold" letter="uppercase">
                    {label}
                </Typography>
            ) : null}
            <div className={checkStyle}>
                {
                    useLoadMore
                    // using load more button
                        ? data?.slice(0, more)?.map((item, index) => (CustomItem ? (
                            <CustomItem
                                label={item.label ? item.label : item}
                                value={item.value ? item.value : item}
                                dataValues={selected}
                                key={index}
                                onChange={(val) => !disabled && setCheckedFilter(val)}
                                {...item}
                            />
                        ) : (
                            <CheckDefault
                                label={item.label ? item.label : item}
                                value={item.value ? item.value : item}
                                dataValues={selected}
                                disabled={disabled}
                                key={index}
                                onChange={(val) => !disabled && setCheckedFilter(val)}
                            />
                        )))
                    // not using load more button
                        : data.map((item, index) => (CustomItem ? (
                            <CustomItem
                                label={item.label ? item.label : item}
                                value={item.value ? item.value : item}
                                dataValues={selected}
                                key={index}
                                onChange={(val) => !disabled && setCheckedFilter(val)}
                                {...item}
                            />
                        ) : (
                            <CheckDefault
                                label={item.label ? item.label : item}
                                value={item.value ? item.value : item}
                                dataValues={selected}
                                disabled={disabled}
                                key={index}
                                onChange={(val) => !disabled && setCheckedFilter(val)}
                            />
                        )))
                }
            </div>
            {
                useLoadMore && data.length > 7 && more <= 7 && (
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
        </div>
    );
};

export default CustomCheckbox;
