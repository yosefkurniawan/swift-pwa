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
import Loading from '@components/Loaders';
import { useTranslation } from '@i18n';
import useStyles from './style';


// constanta to defined if query cannot deleted example "q" using on search
const noClearQuery = ['q'];

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const FilterDialog = ({
    open,
    setOpen,
    itemProps = {},
    data = {},
    elastic = false,
    loading = false,
    sortByData = [],
    getValue = () => {},
    defaultValue = {},
}) => {
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    const [selectedFilter, setFilter] = React.useState(defaultValue);
    const [sort, setSort] = React.useState(defaultValue.sort ? defaultValue.sort : '');
    const [priceRange, setPriceRange] = React.useState(defaultValue.priceRange ? defaultValue.priceRange.split(',') : [0, 0]);
    const handleClear = () => {
        setSort('');
        setPriceRange([0, 0]);
        const query = {};
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < noClearQuery.length; index++) {
            query[noClearQuery[index]] = defaultValue[noClearQuery[index]];
        }
        setFilter({ ...query });
    };

    const handleSave = () => {
        if (selectedFilter.priceRange) {
            delete selectedFilter.priceRange;
        }

        if (selectedFilter.sort) {
            delete selectedFilter.sort;
        }
        const savedData = {
            selectedFilter,
        };
        if (sort !== '') {
            savedData.sort = sort;
        }
        if (priceRange[1] !== 0) {
            savedData.priceRange = priceRange;
        }
        getValue(savedData);
        setOpen();
    };

    const setCheckedFilter = (name, value) => {
        let selected = '';
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < value.length; index++) {
            selected += `${index !== 0 ? ',' : ''}${value[index]}`;
        }
        selectedFilter[name] = selected;
        setFilter({ ...selectedFilter });
    };

    const setSelectedFilter = (code, value) => {
        selectedFilter[code] = value;
        setFilter({ ...selectedFilter });
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
                    variant="label"
                    type="bold"
                    align="center"
                    letter="uppercase"
                    className={styles.title}
                >
                    {t('common:title:shortFilter')}
                </Typography>
            </AppBar>
            <div className={styles.body}>
                {itemProps && itemProps.sortBy === false ? null : (
                    <div className={styles.fieldContainer}>
                        <RadioGroup
                            label={itemProps.labelSortBy || t('common:title:short')}
                            valueData={sortByData || []}
                            value={itemProps.sortByValue || sort}
                            onChange={itemProps.sortByChange || setSort}
                        />
                    </div>
                )}
                {loading ? <Loading size="20px" /> : null}
                {data.map((itemFilter, idx) => {
                    const ItemValueByLabel = [];
                    // eslint-disable-next-line no-plusplus
                    for (let index = 0; index < itemFilter.value.length; index++) {
                        ItemValueByLabel.push({
                            label: itemFilter.value[index].label,
                            value: itemFilter.value[index].label,
                        });
                    }
                    if (itemFilter.field === 'price') {
                        return (
                            <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
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
                        return (
                            <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                <CheckBox
                                    name={itemFilter.field}
                                    label={itemFilter.label || t('common:title:size')}
                                    data={ItemValueByLabel}
                                    value={defaultValue[itemFilter.field] ? defaultValue[itemFilter.field].split(',') : []}
                                    flex={itemProps.selectSizeFlex || 'row'}
                                    CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                                    onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                />
                            </div>
                        );
                    } if (itemFilter.field === 'color') {
                        return (
                            <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                <CheckBox
                                    name={itemFilter.field}
                                    label={itemFilter.label || t('common:title:color')}
                                    data={ItemValueByLabel}
                                    value={defaultValue[itemFilter.field] ? defaultValue[itemFilter.field].split(',') : []}
                                    flex={itemProps.selectSizeFlex || 'row'}
                                    CustomItem={itemProps.selectColorItem || CheckBoxColor}
                                    onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                />
                            </div>
                        );
                    } if (itemFilter.field === 'cat' || itemFilter.field === 'category_id') {
                        return <span key={idx} />;
                    }
                    return (
                        <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                            {elastic ? (
                                <CheckBox
                                    field={itemFilter.field}
                                    label={itemFilter.label || ''}
                                    data={ItemValueByLabel}
                                    value={defaultValue[itemFilter.field] ? defaultValue[itemFilter.field].split(',') : []}
                                    flex="column"
                                    onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                />
                            )
                                : (
                                    <RadioGroup
                                        name={itemFilter.field}
                                        label={itemFilter.label || ''}
                                        valueData={itemFilter.value || []}
                                        value={selectedFilter[itemFilter.field]}
                                        onChange={(value) => setSelectedFilter(itemFilter.field, value)}
                                    />
                                )}
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
                    {t('common:button:clear')}
                </Button>
                <Button className={styles.btnSave} onClick={handleSave}>
                    {t('common:button:save')}
                </Button>
            </div>
        </Dialog>
    );
};

export default FilterDialog;
