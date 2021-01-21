/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import Radio from '@material-ui/core/Radio';
import classNames from 'classnames';
import useStyles from './style';

const RadioDeliveryItem = (props) => {
    const styles = useStyles();
    const {
        value, label, promoLabel, selected, onChange = () => {}, borderBottom = true, image = null, classContent = '',
    } = props;
    const handleChange = () => {
        onChange(value);
    };
    const labelType = selected ? 'bold' : 'regular';
    const rootStyle = borderBottom ? styles.root : styles.rootRmBorder;
    let rightSide;

    if (image) {
        rightSide = <img src={image} className={styles.imgList} alt="cimb" />;
    }

    if (value && value.price !== value.original_price) {
        rightSide = (
            <div className="row between-xs">
                <div className="col-xs-12 col-sm-6">
                    <Typography variant="p" type={labelType} className={styles.originalPrice} align="right">
                        {value.original_price}
                    </Typography>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Typography variant="p" type={labelType} className={styles.promo} align="right">
                        {value.price}
                    </Typography>
                </div>
            </div>
        );
    } else if (value && value.price) {
        rightSide = (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <Typography variant="p" type={labelType} className={styles.notPromo} align="right">
                        {value.price}
                    </Typography>
                </div>
            </div>
        );
    }

    const shippingLabel = (
        <div>
            <Typography variant="p" type={labelType} className={styles.originalLabel}>
                {label}
            </Typography>
            {promoLabel ? (
                <Typography variant="p" type={labelType}>
                    (
                    {promoLabel}
                    )
                </Typography>
            ) : null}
        </div>
    );

    return (
        <div className={rootStyle} onClick={handleChange} id="checkoutRadioItem">
            <Radio color="default" size="small" checked={selected} />
            <div className={classNames(styles.labelContainer, classContent)}>
                {shippingLabel}
                {rightSide}
            </div>
        </div>
    );
};

export default RadioDeliveryItem;
