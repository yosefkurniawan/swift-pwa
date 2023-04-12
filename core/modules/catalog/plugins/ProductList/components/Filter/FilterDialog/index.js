/* eslint-disable radix */
import Button from '@common_button';
import CheckBox from '@common_checkbox';
import CheckBoxColor from '@common_forms/CheckBoxColor';
import CheckBoxSize from '@common_forms/CheckBoxSize';
import Loading from '@common_loaders';
import RadioGroup from '@common_radio';
import RangeSlider from '@common_rangeslider';
import Typography from '@common_typography';
import { getSeller } from '@core_modules/catalog/services/graphql';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import { BREAKPOINTS } from '@theme/vars';
import React from 'react';
import { useRouter } from 'next/router';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => <Slide direction={window.innerWidth >= BREAKPOINTS.sm ? 'left' : 'up'} ref={ref} {...props} />);

const FilterDialog = (props) => {
    const {
        open,
        setOpen,
        itemProps = {},
        elastic = false,
        loading = false,
        sortByData = [],
        t,
        sort,
        setSort,
        priceRange,
        setPriceRange,
        selectedFilter,
        setCheckedFilter,
        setSelectedFilter,
        handleSave,
        handleClear,
        filter,
        isSearch,
        onChangeCategory,
        storeConfig,
    } = props;
    const styles = useStyles();
    const data = filter;
    const [actGetSeller, dataSeller] = getSeller();
    const [sellerId, setSellerId] = React.useState([]);
    const router = useRouter();

    React.useEffect(() => {
        // console.log('data', data);
        data.forEach((itemFilter) => {
            if (itemFilter.field === 'seller_id') {
                actGetSeller({
                    variables: {
                        seller_id: itemFilter.value.map((item) => parseInt(item.value)),
                    },
                });
            }
        });
    }, [data]);

    React.useEffect(() => {
        if (dataSeller && dataSeller.data) {
            // eslint-disable-next-line prefer-const
            let childValue = [];
            data.forEach((itemFilter) => {
                if (itemFilter.field === 'seller_id') {
                    itemFilter.value.forEach((item) => {
                        const findSeller = dataSeller.data.getSeller.filter((itemSeller) => itemSeller.id === parseInt(item.value));
                        if (parseInt(item.value) === findSeller[0]?.id) {
                            childValue.push({
                                count: item.count,
                                label: findSeller[0].name,
                                value: item.value,
                            });
                        }
                    });
                    if (sellerId.length === 0) {
                        setSellerId({
                            field: 'seller_id',
                            label: 'Seller Name',
                            value: childValue,
                        });
                    }
                }
            });
        }
    }, [dataSeller, sellerId]);

    return (
        <Drawer
            anchor={typeof window !== 'undefined' && window.innerWidth >= BREAKPOINTS.sm ? 'right' : 'bottom'}
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
            classes={{
                paper: styles.drawerPaper,
            }}
        >
            <AppBar className={styles.appBar}>
                <IconButton className={styles.btnClose} edge="start" onClick={setOpen} aria-label="close">
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography variant="label" type="bold" align="center" letter="uppercase" className={styles.title}>
                    {t('catalog:title:shortFilter')}
                </Typography>
            </AppBar>
            <div className={styles.body}>
                {itemProps && itemProps.sortBy === false ? null : (
                    <div className={`${styles.fieldContainer}`}>
                        <RadioGroup
                            label={itemProps.labelSortBy || t('catalog:title:short')}
                            valueData={sortByData || []}
                            value={itemProps.sortByValue || sort}
                            onChange={itemProps.sortByChange || setSort}
                            useLoadMore
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

                    if (itemFilter.field !== 'attribute_set_id' && itemFilter.field !== 'indexed_attributes' && itemFilter.field !== 'seller_name') {
                        if (itemFilter.field === 'etalase' || (itemFilter.field === 'seller_id' && router.route.includes('seller'))) {
                            return <span key={idx} />;
                        }

                        if (itemFilter.field === 'seller_id' && sellerId && sellerId.field && sellerId.label) {
                            return (
                                <div className={`${styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']}`} key={idx}>
                                    <CheckBox
                                        field={sellerId.field}
                                        label={sellerId.label || ''}
                                        data={sellerId.value || []}
                                        value={selectedFilter[sellerId.field] ? selectedFilter[sellerId.field].split(',') : []}
                                        flex="column"
                                        onChange={(val) => setCheckedFilter(sellerId.field, val)}
                                    />
                                </div>
                            );
                        }
                        if (itemFilter.field === 'price') {
                            return (
                                <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                    <RangeSlider
                                        label={itemFilter.label}
                                        maxValue={parseInt(itemFilter.value[itemFilter.value.length - 1].value)}
                                        value={priceRange}
                                        storeConfig={storeConfig}
                                        onChange={itemProps.priceRangeChange || setPriceRange}
                                    />
                                </div>
                            );
                        }
                        if (itemFilter.field === 'color') {
                            return (
                                <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                    <CheckBox
                                        name={itemFilter.field}
                                        label={itemFilter.label || t('catalog:title:color')}
                                        data={ItemValueByLabel}
                                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                                        flex={itemProps.selectSizeFlex || 'row'}
                                        CustomItem={itemProps.selectColorItem || CheckBoxColor}
                                        onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                    />
                                </div>
                            );
                        }
                        if (itemFilter.field === 'size') {
                            return (
                                <div className={styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']} key={idx}>
                                    <CheckBox
                                        name={itemFilter.field}
                                        label={itemFilter.label || t('catalog:title:size')}
                                        data={ItemValueByLabel}
                                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                                        flex={itemProps.selectSizeFlex || 'row'}
                                        CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                                        onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                    />
                                </div>
                            );
                        }
                        if ((itemFilter.field === 'cat' || itemFilter.field === 'category_id') && !isSearch) {
                            return (
                                <div className={styles.listCategoryWrapper}>
                                    <Typography variant="label" type="bold" letter="uppercase">
                                        {itemFilter.label.replace(/_/g, ' ')}
                                    </Typography>
                                    <div className={styles.listCategoryBody}>
                                        {itemFilter.value.map((val, ids) => {
                                            if (val !== 'attribute_set_id') {
                                                return (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => onChangeCategory(e, val.value)}
                                                        className={styles.listCategory}
                                                        key={ids}
                                                    >
                                                        <Typography variant="span" letter="capitalize">
                                                            {`${val.label.replace(/_/g, ' ')} (${val.count})`}
                                                        </Typography>
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div className={`${styles[idx < data.length - 1 ? 'fieldContainer' : 'fieldContainerLast']}`} key={idx}>
                                {elastic ? (
                                    <CheckBox
                                        field={itemFilter.field}
                                        label={itemFilter.label || ''}
                                        data={ItemValueByLabel}
                                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                                        flex="column"
                                        onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                        useLoadMore
                                    />
                                ) : (
                                    <RadioGroup
                                        name={itemFilter.field}
                                        label={itemFilter.label || ''}
                                        valueData={itemFilter.value || []}
                                        value={selectedFilter[itemFilter.field]}
                                        onChange={(value) => setSelectedFilter(itemFilter.field, value)}
                                        useLoadMore
                                    />
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            <div className={styles.footer}>
                <Button variant="outlined" className={styles.btnSave} onClick={handleClear}>
                    {t('catalog:button:clear')}
                </Button>
                <Button className={styles.btnSave} onClick={handleSave}>
                    {t('catalog:button:save')}
                </Button>
            </div>
        </Drawer>
    );
};

export default FilterDialog;
