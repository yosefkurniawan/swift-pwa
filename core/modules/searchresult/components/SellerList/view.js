/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-plusplus */
import Typography from '@common_typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import useStyles from '@core_modules/searchresult/components/style';

const SellerItem = (props) => {
    const styles = useStyles();
    const {
        name, id, logo, city,
    } = props;
    const citySplit = city?.split(',');

    return (
        <div className={styles.titleContainer}>
            <Link href={`/seller/${id}`}>
                <div className={styles.sellerContainer}>
                    <div className={styles.imageContainer}>
                        <img
                            className={styles.img}
                            src={logo}
                        />
                    </div>
                    <div>
                        <Typography variant="p" type="bold" letter="capitalize" size="14">
                            {name}
                        </Typography>
                        <Typography variant="p" type="regular" letter="capitalize" size="12">
                            {citySplit[0]}
                        </Typography>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const SellerView = (props) => {
    const { data } = props;
    const styles = useStyles();

    return (
        <div className={styles.wrapper}>
            <div className={styles.topTitle}>
                Seller
            </div>
            <Grid container>
                {data.map((item, idx) => (
                    <Grid key={idx} item xs={12} sm={4} md={3}>
                        <SellerItem {...item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default SellerView;
