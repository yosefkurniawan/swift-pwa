import Carousel from '@components/Slider/Carousel';
import Typography from '@common_typography';
import useStyles from './style';

const CrossSell = (props) => {
    const { t, editMode = false, data = [] } = props;
    const styles = useStyles();
    const customStyle = !editMode ? styles.margin : '';
    return (
        <>
            <div className={customStyle}>
                <Typography
                    variant="h3"
                    type="bold"
                    letter="uppercase"
                    align="center"
                    className={styles.crossselTitle}
                >
                    {t('cart:crossell:title')}
                </Typography>
                <div className={styles.slider}>
                    <Carousel data={data} />
                </div>
            </div>
        </>
    );
};

export default CrossSell;
