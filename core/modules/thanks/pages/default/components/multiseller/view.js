/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Typography from '@common_typography';
import IconArrow from '@material-ui/icons/ArrowForwardIos';
import classNames from 'classnames';
import useStyles from '@core_modules/thanks/pages/default/components/style';
import Link from 'next/link';
import propTypes from 'prop-types';

const ViewThanksMultiSeller = (props) => {
    const {
        t,
        isLogin,
        handleCotinue,
        ordersFilter,
        handleConfirmPayment,
        customerOrder,
    } = props;
    const styles = useStyles();

    return (
        <div className={classNames(styles.container, 'thanks-pages')}>
            <div className={styles.info}>
                <Typography variant="h1" type="bold" letter="uppercase" className={styles.title}>
                    {t('thanks:thanks')}
                </Typography>
                <Typography variant="span" className="clear-margin-padding" letter="none">
                    {t('thanks:placeInfo')}
                </Typography>
            </div>
            {
                customerOrder && customerOrder.length > 0 && customerOrder.map((item, key) => (
                    <div className={styles.info} key={key}>
                        <Typography variant="span" className={styles.infoOrderId} letter="none">
                            {`${t('thanks:yourOrderId')} : `}
                            {isLogin && isLogin === 1 ? (
                                <Link href={`/customer/account/create?order_id=${item?.order_number}`} pashref>
                                    <a>
                                        <b>{item?.order_number}</b>
                                    </a>
                                </Link>
                            ) : (
                                <b>{item?.order_number}</b>
                            )}
                        </Typography>
                        <Typography variant="span" className="clear-margin-padding" letter="none">
                            {`${t('thanks:seller')} : `}
                            {item?.seller_name}
                        </Typography>
                    </div>
                ))
            }
            <div className={classNames(styles.footer, 'hidden-desktop')}>
                {ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer' ? (
                    <>
                        <Button onClick={handleConfirmPayment} className={[styles.btnConfirm, styles.btnConfirmFirst].join(' ')}>
                            <Typography variant="p" letter="uppercase" color="white" type="bold" align="center">
                                {t('thanks:paymentConfirmation')}
                            </Typography>
                        </Button>
                        <Button
                            onClick={handleCotinue}
                            className={styles.btnConfirm}
                            variant="text"
                            endIcon={<IconArrow className={styles.btnConfirmIcon} />}
                        >
                            {t('thanks:continue')}
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleCotinue} className={styles.btnConfirm} endIcon={<IconArrow className={styles.btnConfirmIcon} />}>
                        <Typography size="10" type="bold" color="white" letter="uppercase" className={styles.txtConfirm}>
                            {t('thanks:continue')}
                        </Typography>
                    </Button>
                )}
            </div>
        </div>
    );
};

ViewThanksMultiSeller.propTypes = {
    storeConfig: propTypes.object.isRequired,
    checkoutData: propTypes.object.isRequired,
    t: propTypes.func.isRequired,
    customerOrder: propTypes.array.isRequired,
};

export default ViewThanksMultiSeller;
