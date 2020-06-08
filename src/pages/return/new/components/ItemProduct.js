import Typography from '@components/Typography';
import { formatPrice } from '@helpers/currency';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@components/Forms/Select';
import useStyles from '../style';

const optionReason = [
    { label: 'Wrong Size', value: 'wrong-size' },
    { label: 'Wrong Color', value: 'wrong-color' },
    { label: "Don't Line", value: 'dont-like' },
    { label: "I've change my mind", value: 'change' },
    { label: 'Item Broken', value: 'item-broken' },
];

const ItemProduct = (props) => {
    const {
        name, price, qty_ordered, currency, t, image_url,
        dataValues, value, onChange,
    } = props;
    const styles = useStyles();
    const checked = dataValues.indexOf(value) !== -1;
    const handleChange = () => {
        onChange(value);
    };
    const [reason, setReason] = React.useState('');
    return (
        <div className="column">
            <div className={styles.itemContainer}>
                <Checkbox
                    checked={checked}
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
                    <Typography variant="label">{name || ''}</Typography>
                    <Typography variant="span">{formatPrice(price, currency)}</Typography>
                    <Typography variant="span" className={styles.textDetail}>
                        {t('common:title:qty')}
                        {' '}
                        :
                        {qty_ordered || 0}
                    </Typography>
                    <div className="flex-grow" />
                </div>
            </div>

            <div className={styles.selectItemBox}>
                {
                    checked ? (
                        <Select
                            options={optionReason}
                            name="reason"
                            label={t('order:formReturn:label:reason')}
                            value={reason}
                            onChange={(event) => setReason(event.target.value)}
                        />
                    )
                        : (
                            <Typography>{t('order:formReturn:label:tickSelect')}</Typography>
                        )
                }
            </div>
        </div>
    );
};

export default ItemProduct;
