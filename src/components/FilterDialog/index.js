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
import Loading from '@components/Loaders';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const FilterDialog = ({
    open,
    setOpen,
    itemProps = {},
    data = {},
    loading = false,
    sortByData = [],
    getValue = () => {},
}) => {
    const styles = useStyles();
    const [sort, setSort] = React.useState('');
    const [priceRange, setPriceRange] = React.useState([0, 0]);
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
    let filter = [];
    if (data.getFilterAttributeOptions) {
        filter = data.getFilterAttributeOptions.data;
    }
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
                            valueData={sortByData || []}
                            value={itemProps.sortByValue || sort}
                            onChange={itemProps.sortByChange || setSort}
                        />
                    </div>
                )}
                {loading ? <Loading size="20px" /> : null}
                {filter.map((itemFilter, idx) => {
                    if (itemFilter.field === 'price') {
                        return (
                            <div className={styles.fieldContainer} key={idx}>
                                <RangeSlider
                                    label={itemFilter.label}
                                    maxValue={itemFilter.maxprice}
                                    value={priceRange}
                                    onChange={
                                        itemProps.priceRangeChange
                                        || setPriceRange
                                    }
                                />
                            </div>
                        );
                    } if (itemFilter.field === 'size') {
                        const selectSizeData = [];
                        // eslint-disable-next-line no-plusplus
                        for (let index = 0; index < itemFilter.value.length; index++) {
                            selectSizeData.push(itemFilter.value[index].label);
                        }
                        return (
                            <div className={styles.fieldContainer} key={idx}>
                                <CheckBox
                                    label={itemFilter.label || 'Size'}
                                    data={selectSizeData || []}
                                    value={itemProps.selectSizeValue || size}
                                    flex={itemProps.selectSizeFlex || 'row'}
                                    CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                                    onChange={itemProps.selectSizeChange || setSize}
                                />
                            </div>
                        );
                    } if (itemFilter.field === 'color') {
                        const selectColorData = [];
                        // eslint-disable-next-line no-plusplus
                        for (let index = 0; index < itemFilter.value.length; index++) {
                            selectColorData.push(itemFilter.value[index].label);
                        }
                        return (
                            <div className={styles.fieldContainer} key={idx}>
                                <CheckBox
                                    label={itemFilter.label || 'Color'}
                                    data={selectColorData || []}
                                    value={itemProps.selectColorValue || color}
                                    flex={itemProps.selectColorFlex || 'row'}
                                    CustomItem={itemProps.selectColorItem || CheckBoxColor}
                                    onChange={itemProps.selectColorChange || setColor}
                                />
                            </div>
                        );
                    } if (itemFilter.field === 'brand') {
                        const selectBrandData = [];
                        // eslint-disable-next-line no-plusplus
                        for (let index = 0; index < itemFilter.value.length; index++) {
                            selectBrandData.push(itemFilter.value[index].label);
                        }
                        return (
                            <div className={classNames(styles.fieldContainer, styles.last)} key={idx}>
                                <CheckBox
                                    label={itemFilter.label || 'Brand'}
                                    data={selectBrandData || []}
                                    value={itemProps.selectBrandValue || brand}
                                    flex={itemProps.selectBrandFlex || 'column'}
                                    onChange={itemProps.selectBrandChange || setbrand}
                                />
                            </div>
                        );
                    }
                    return (
                        <div className={styles.fieldContainer} key={idx}>
                            <RadioGroup
                                label={itemFilter.label || ''}
                                valueData={itemFilter.value || []}
                                value={itemProps.filterValue ? itemProps.filterValue[itemFilter.field] : ''}
                                onChange={() => {}}
                            />
                        </div>
                    );
                })}
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
