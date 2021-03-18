/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import SelectColor from '@common_forms/SelectColor';
// import SelectSize from '@common_forms/SelectSize';
// import { formatPrice } from '@helper_currency';
import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';
import React from 'react';
import Button from '@common_button';
import useStyles from './style';

const Checkbox = ({
    val, handleOption,
}) => (
    <div className="options-container">
        <input
            type="checkbox"
            onClick={() => handleOption(val.id, val.price)}
            id={val.id}
            name={val.id}
            value={val.id}
            defaultChecked={val.is_default}
        />
        <label
            className="label-options"
            htmlFor={val.id}
            dangerouslySetInnerHTML={{
                __html: `${val.title} + <b>${val.price}</b>`,
            }}
        />
        <br />
        <hr />
    </div>
);

const DownloadView = (props) => {
    const {
        items, handleOption, disabled, loading,
        showQty = true, qty, setQty, handleAddToCart, t,
    } = props;
    const styles = useStyles();
    return (
        <>
            <div className="options-container">
                {items.map((val, key) => (
                    <Checkbox val={val} key={key} handleOption={handleOption} />
                ))}
                <br />
            </div>
            { showQty && (
                <div className={styles.qty}>
                    <Typography type="bold" variant="span">{t('common:title:qty')}</Typography>
                    <ButtonQty
                        value={qty}
                        onChange={setQty}
                        max={10000}
                        disabled={disabled}
                    />
                </div>
            ) }
            <div className={styles.SimpleOptionView}>
                <Button
                    className={styles.btnAddToCard}
                    color="primary"
                    onClick={handleAddToCart}
                    loading={loading}
                    disabled={disabled}
                >
                    <Typography
                        align="center"
                        type="bold"
                        letter="uppercase"
                        color="white"
                        variant="span"
                    >
                        {t('product:addToCart')}
                    </Typography>
                </Button>
            </div>
        </>
    );
};

export default DownloadView;
