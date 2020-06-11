import Typography from '@components/Typography';
import { formatPrice } from '@helpers/currency';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from '@i18n';
import useStyles from '../style';
import ItemField from './ItemField';

const optionReason = [
    { label: 'Wrong Size', value: 'wrong-size' },
    { label: 'Wrong Color', value: 'wrong-color' },
    { label: "Don't Line", value: 'dont-like' },
    { label: "I've change my mind", value: 'change' },
    { label: 'Item Broken', value: 'item-broken' },
];

const ItemProduct = (props) => {
    const { t } = useTranslation(['return']);
    const {
        name, price, qty_returnable, currency, image_url,
        dataValues, value, onChange, form, disabled,
        other_rma_request,
    } = props;
    const styles = useStyles();
    const checked = dataValues.indexOf(value) !== -1;
    const handleChange = () => {
        onChange(value);
    };
    const optionQty = [];
    if (qty_returnable > 0) {
        for (let index = 1; index <= qty_returnable; index += 1) {
            optionQty.push({
                label: index,
                value: index,
            });
        }
    }
    return (
        <div className="column">
            <div className={styles.itemContainer}>
                <Checkbox
                    checked={checked}
                    disabled={disabled}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': name }}
                />
                <div className={styles.productImgContainer}>
                    <img
                        src={image_url || '/assets/img/placeholder.png'}
                        className={styles.productImg}
                        alt={name}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    />
                </div>
                <div className={styles.detailItem}>
                    <Typography variant="span" type="semiBold">{name || ''}</Typography>
                    <Typography variant="span">{formatPrice(price, currency)}</Typography>
                    <div className="flex-grow" />
                </div>
            </div>

            <div className={styles.selectItemBox}>
                {
                    disabled ? (
                        <Typography color="red">{t('return:noItemReturn')}</Typography>
                    ) : null
                }
                {
                    other_rma_request && other_rma_request.length > 0 ? (
                        <div className="column">
                            <Typography color="red">{t('return:otherRequestRma')}</Typography>
                            <div className="row">
                                {
                                    other_rma_request.map((number_rma, indx) => (
                                        <Typography key={indx} type="semiBold">
                                            #
                                            {number_rma}
                                        </Typography>
                                    ))
                                }
                            </div>
                        </div>
                    ) : null
                }
                {
                    checked && qty_returnable > 0 && (
                        <ItemField
                            options={optionQty}
                            name="Qty"
                            label="Qty"
                        />
                    )
                }
                {
                    checked ? form && form.length > 0 && form.map((item, index) => {
                        if (item.refers === 'item') {
                            const names = item.name.split(' ').join('_').toLowerCase();
                            return (
                                <ItemField
                                    key={index}
                                    options={optionReason}
                                    name={names}
                                    label={item.frontend_labels[0].value}
                                />
                            );
                        } return null;
                    })
                        : !disabled && (
                            <Typography align="center">{t('return:form:label:tickSelect')}</Typography>
                        )
                }
            </div>
        </div>
    );
};

export default ItemProduct;
