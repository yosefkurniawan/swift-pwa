import {
    Button, Card, CardContent, CardMedia, IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PriceFormat from '@components/PriceFormat';
import Typography from '@components/Typography';
import useStyles from './style';

export default ({
    price_range,
    price_tiers,
    __typename,
    imageSrc,
    name,
}) => {
    const styles = useStyles();
    return (
        <Card className={styles.card}>
            <CardMedia image={imageSrc} className={styles.cardImage} />
            <CardContent className={styles.cardContent}>
                <div className={styles.cardProductDetails}>
                    <Typography variant="p">{name}</Typography>
                    <PriceFormat priceRange={price_range} priceTiers={price_tiers} productType={__typename} />
                    <Button variant="contained" className={[styles.productAddToCart].join(' ')}>
                        Add To Bag
                    </Button>
                </div>
                <div className={styles.cardProductAction}>
                    <IconButton>
                        <Delete />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
};
