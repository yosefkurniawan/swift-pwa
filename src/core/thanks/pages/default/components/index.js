import Button from '@common_button';
import Typography from '@common_typography';
import Link from 'next/link';
import classNames from 'classnames';
import useStyles from './style';

const View = (props) => {
    const {
        t, isLogin, checkoutData, handleCotinue,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Typography variant="h1" type="bold" align="center">
                {t('thanks:thanks')}
                {' '}
                <br />
                {t('thanks:forOrder')}
            </Typography>
            <Typography variant="span" align="center">
                {t('thanks:thanksDetail')}
            </Typography>
            <Typography variant="span" align="center">
                {t('thanks:yourOrderId')}
            </Typography>
            <Typography variant="title" type="bold" align="center">
                {checkoutData.order_number}
            </Typography>
            {isLogin && isLogin === 1 ? (
                <Link href="/sales/order/view/order_id/[id]" as={`/sales/order/view/order_id/${checkoutData.order_number}`}>
                    <a>
                        <Typography variant="span" type="regular" letter="capitalize" decoration="underline">
                            {t('thanks:checkOrder')}
                        </Typography>
                    </a>
                </Link>
            ) : null}
            <div className={classNames('hidden-mobile', styles.desktopFooter)}>
                <Button className={styles.btnContinue} color="primary" onClick={handleCotinue}>
                    <Typography variant="title" type="regular" letter="capitalize" className={styles.textBtn}>
                        {t('thanks:continue')}
                    </Typography>
                </Button>
            </div>
            <div className={classNames('hidden-desktop', styles.footer)}>
                <Button className={styles.btnContinue} color="primary" onClick={handleCotinue}>
                    <Typography variant="title" type="regular" letter="capitalize" className={styles.textBtn}>
                        {t('thanks:continue')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default View;
