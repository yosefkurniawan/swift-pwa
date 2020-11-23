/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import Radio from '@material-ui/core/Radio';
import classNames from 'classnames';
import useStyles from './style';

const RadioDeliveryItem = (props) => {
    const styles = useStyles();
    const {
        value,
        label,
        promoLabel,
        selected,
        onChange = () => {},
        borderBottom = true,
        image = null,
        classContent = '',
    } = props;
    const handleChange = () => {
        onChange(value);
    };
    const labelType = selected ? 'bold' : 'regular';
    const rootStyle = borderBottom ? styles.root : styles.rootRmBorder;
    let rightSide;
    let shippingLabel;

    if (image) {
        rightSide = <img src={image} className={styles.imgList} alt="cimb" />;
    }

    if (value && value.price !== value.original_price) {
        rightSide = (
            <>
                <Typography variant="p" type={labelType} className={styles.originalPrice}>
                    {value.original_price}
                </Typography>
                <Typography variant="p" type={labelType} className={styles.promo}>
                    {value.price}
                </Typography>
            </>
        );
    } else if (value && value.price) {
        rightSide = (
            <Typography variant="p" type={labelType} className={styles.notPromo}>
                {value.price}
            </Typography>
        );
    }

    if (promoLabel !== '') {
        shippingLabel = (
            <Typography variant="p" type={labelType} className={styles.promoLabel}>
                {label}
                {' '}
                (
                {promoLabel}
                )
            </Typography>
        );
    } else {
        shippingLabel = (
            <Typography variant="p" type={labelType} className={styles.noPromoLabel}>
                {label}
            </Typography>
        );
    }

    return (
        <div className={rootStyle} onClick={handleChange}>
            <Radio color="default" size="small" checked={selected} />
            <div className={classNames(styles.labelContainer, classContent)}>
                {shippingLabel}
                {rightSide}
            </div>
        </div>
    );
};

export default RadioDeliveryItem;
