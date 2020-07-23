import Typography from '@common_typography';
import Button from '@common_button';
import Tune from '@material-ui/icons/Tune';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '../../style';

const FilterView = (props) => {
    const {
        products, t, setOpenFilter, loading,
    } = props;
    const styles = useStyles();
    if (loading) return <Skeleton variant="rect" width="100%" height={50} style={{ marginBottom: 10 }} />;
    return (
        <div className={styles.filterContainer}>
            <Typography variant="p" type="regular" className={styles.countProductText}>
                {products.total_count}
                {' '}
                {t('catalog:product:name')}
            </Typography>
            <div className={styles.filterBtnContainer}>
                <Button variant="text" customRootStyle={{ width: 'fit-content' }} className={styles.btnFilter} onClick={() => setOpenFilter(true)}>
                    <Tune className={styles.iconFilter} />
                </Button>
                <Typography type="bold" variant="span" letter="capitalize">
                    {t('catalog:title:shortFilter')}
                </Typography>
            </div>
        </div>
    );
};

export default FilterView;
