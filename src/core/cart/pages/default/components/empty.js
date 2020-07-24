import Typography from '@common_typography';
import Button from '@common_button';
import Link from 'next/link';
import useStyles from './style';

const EmptyView = (props) => {
    const styles = useStyles();
    const { t } = props;
    return (
        <div className={styles.container} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="span" type="regular" align="center">
                <span className={styles.emptyCart}>{t('cart:empty:text')}</span>
            </Typography>
            <Link href="/">
                <a>
                    <Button className={styles.toolbarButton} customRootStyle={{ width: 'fit-content' }}>
                        {t('common:button:continueShopping')}
                    </Button>
                </a>
            </Link>
        </div>
    );
};

export default EmptyView;
