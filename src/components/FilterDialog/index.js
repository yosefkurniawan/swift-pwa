import {
    AppBar, Dialog, IconButton, Slide,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React from 'react';
import RadioGroup from '@components/Forms/Radio';
import Typography from '@components/Typography';
import RangeSlider from '@components/Forms/RangeSlider';
import CheckBox from '@components/Forms/CheckBox';
import CheckBoxSize from '@components/Forms/CheckBoxSize';
import CheckBoxColor from '@components/Forms/CheckBoxColor';
import Button from '@components/Button';
import classNames from 'classnames';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const FilterDialog = ({
    open,
    setOpen,
    itemProps = {},
    getValue = () => {},
}) => {
    const styles = useStyles();
    const [sort, setSort] = React.useState('');
    const [priceRange, setPriceRange] = React.useState(itemProps.priceRangeValue || [0, 0]);
    const [size, setSize] = React.useState([]);
    const [color, setColor] = React.useState([]);
    const [brand, setbrand] = React.useState([]);

    const handleClear = () => {
        setSort('');
        setPriceRange([0, 0]);
        setSize([]);
        setColor([]);
        setbrand([]);
    };

    const handleSave = () => {
        getValue({
            sort,
            priceRange,
            size,
            color,
            brand,
        });
        setOpen();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
        >
            <AppBar className={styles.appBar}>
                <IconButton
                    className={styles.btnClose}
                    edge="start"
                    onClick={setOpen}
                    aria-label="close"
                >
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography
                    variant="span"
                    type="bold"
                    align="center"
                    letter="uppercase"
                    className={styles.title}
                >
                    Filter & Sort
                    {' '}
                </Typography>
            </AppBar>
            <div className={styles.body}>
                {itemProps && itemProps.sortBy === false ? null : (
                    <div className={styles.fieldContainer}>
                        <RadioGroup
                            label={itemProps.labelSortBy || 'Sort By'}
                            valueData={itemProps.sortByData || []}
                            value={itemProps.sortByValue || sort}
                            onChange={itemProps.sortByChange || setSort}
                        />
                    </div>
                )}
                {itemProps && itemProps.priceRange === false ? null : (
                    <div className={styles.fieldContainer}>
                        <RangeSlider
                            label={itemProps.labelPriceRange || 'Price Range'}
                            maxValue={itemProps.priceRangeMaxValue || 100}
                            value={priceRange}
                            onChange={itemProps.priceRangeChange || setPriceRange}
                        />
                    </div>
                )}
                {itemProps && itemProps.selectSize === false ? null : (
                    <div className={styles.fieldContainer}>
                        <CheckBox
                            label={itemProps.selectSize || 'Size'}
                            data={itemProps.selectSizeData || []}
                            value={itemProps.selectSizeValue || size}
                            flex={itemProps.selectSizeFlex || 'row'}
                            CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                            onChange={itemProps.selectSizeChange || setSize}
                        />
                    </div>
                )}
                {itemProps && itemProps.selectColor === false ? null : (
                    <div className={styles.fieldContainer}>
                        <CheckBox
                            label={itemProps.selectColor || 'Color'}
                            data={itemProps.selectColorData || []}
                            value={itemProps.selectColorValue || color}
                            flex={itemProps.selectColorFlex || 'row'}
                            CustomItem={itemProps.selectColorItem || CheckBoxColor}
                            onChange={itemProps.selectColorChange || setColor}
                        />
                    </div>
                )}
                {itemProps && itemProps.selectBrand === false ? null : (
                    <div className={classNames(styles.fieldContainer, styles.last)}>
                        <CheckBox
                            label={itemProps.selectBrand || 'Brand'}
                            data={itemProps.selectBrandData || []}
                            value={itemProps.selectBrandValue || brand}
                            flex={itemProps.selectBrandFlex || 'column'}
                            onChange={itemProps.selectBrandChange || setbrand}
                        />
                    </div>
                )}
            </div>

            <div className={styles.footer}>
                <Button
                    variant="outlined"
                    className={styles.btnSave}
                    onClick={handleClear}
                >
                    Clear
                </Button>
                <Button className={styles.btnSave} onClick={handleSave}>
                    Save
                </Button>
            </div>
        </Dialog>
    );
};

export default FilterDialog;
