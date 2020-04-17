import Typography from '@components/Typography';
import Button from '@components/Button';
import Routes from 'next/router';
import useStyles from './style';

const ThanksPage = (props) => {
    const { t } = props;
    const backgroundImageUrl = '/assets/img/sample/home-slider.png';
    const styles = useStyles();
    const customStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
    };
    return (
        <div className={styles.container} style={customStyle}>
            <Typography variant="h1" type="bold" align="center">
                {t('checkout:thanks')}
                {' '}
                <br />
                {t('checkout:forOrder')}
            </Typography>
            <Typography variant="span" align="center">
                {t('checkout:thanksDetail')}
            </Typography>
            <Button className={styles.btnContinue} onClick={() => Routes.push('/')}>
                <Typography
                    variant="title"
                    type="regular"
                    letter="capitalize"
                    className={styles.textBtn}
                >
                    {t('checkout:continue')}
                </Typography>
            </Button>
        </div>
    );
};

export default ThanksPage;
