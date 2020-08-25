/* eslint-disable no-unused-vars */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RangeSlider from '@common_rangeslider';
import CheckBox from '@common_checkbox';
import CheckBoxSize from '@common_forms/CheckBoxSize';
import CheckBoxColor from '@common_forms/CheckBoxColor';
import RadioGroup from '@common_radio';
import useStyles from './style';

const ViewFilter = (props) => {
    const {
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
    } = props;
    const styles = useStyles();

    const checkedFilter = (field, value) => {
        setCheckedFilter(field, value);
        setTimeout(() => {
            handleSave();
        }, 1000);
    };

    const selectFilter = (field, value) => {
        setSelectedFilter(field, value);
        setTimeout(() => {
            handleSave();
        }, 1000);
    };

    const generateFilter = (data, itemFilter, idx) => {
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
                <div key={idx}>
                    <RangeSlider
                        noLabel
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
        } if (itemFilter.field === 'color') {
            return (
                <div key={idx}>
                    <CheckBox
                        name={itemFilter.field}
                        noLabel
                        label={itemFilter.label || t('catalog:title:color')}
                        data={ItemValueByLabel}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex={itemProps.selectSizeFlex || 'row'}
                        CustomItem={itemProps.selectColorItem || CheckBoxColor}
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                </div>
            );
        } if (itemFilter.field === 'size') {
            return (
                <div key={idx}>
                    <CheckBox
                        name={itemFilter.field}
                        noLabel
                        label={itemFilter.label || t('catalog:title:size')}
                        data={ItemValueByLabel}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex={itemProps.selectSizeFlex || 'row'}
                        CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                </div>
            );
        } if (itemFilter.field === 'cat' || itemFilter.field === 'category_id') {
            return <span key={idx} />;
        }
        return (
            <div key={idx}>
                {elastic ? (
                    <CheckBox
                        field={itemFilter.field}
                        noLabel
                        label={itemFilter.label || ''}
                        data={ItemValueByLabel}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex="column"
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                )
                    : (
                        <RadioGroup
                            noLabel
                            name={itemFilter.field}
                            label={itemFilter.label || ''}
                            valueData={itemFilter.value || []}
                            value={selectedFilter[itemFilter.field]}
                            onChange={(value) => selectFilter(itemFilter.field, value)}
                        />
                    )}
            </div>
        );
    };

    return (
        <div className={styles.root}>
            {filter.map((itemFilter, idx) => (
                <Accordion key={idx}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={styles.heading}>{itemFilter.label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {generateFilter(filter, itemFilter, idx)}
                    </AccordionDetails>
                </Accordion>
            ))}

        </div>
    );
};

export default ViewFilter;
