// Library
import React from 'react';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Footer from '../Footer';
import useStyles from './style';

const WihtOut = (props) => {
    const styles = useStyles();
    const { t } = props;
    return (
        <div className={styles.root}>
            <div className={styles.authBlock}>
                <Typography variant="span">{t('customer:login:haveAccount')}</Typography>
                <Button fullWidth className={styles.btnSigin} href="/customer/account/login">
                    <Typography variant="title" type="regular" letter="capitalize" color="white">
                        {t('common:button:login')}
                    </Typography>
                </Button>
                <Typography variant="span">{t('customer:login:notHaveAccount')}</Typography>
                <Button fullWidth className={styles.btnSigin} variant="outlined" href="/customer/account/create">
                    <Typography variant="title" type="regular" letter="capitalize">
                        {t('common:button:register')}
                    </Typography>
                </Button>
            </div>
            <span className={styles.span} />
            <Footer {...props} />
        </div>
    );
};

export default WihtOut;
