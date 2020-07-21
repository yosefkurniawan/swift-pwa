import Button from '@Button';
import PriceFormat from '@PriceFormat';
import Typography from '@components/Typography';
import ConfirmationDelete from '@ConfirmDialog';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Link from 'next/link';
import useStyles from './style';

export default ({
    price_range, price_tiers, __typename, imageSrc,
    name, wishlistItemId, t, sku, url_key,
    handleRemove, handleToCart,
}) => {
    const styles = useStyles();
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleDelete = () => {
        handleRemove({ wishlistItemId });
        setOpenDelete(!openDelete);
    };
    const handleAddToCart = () => {
        handleToCart({
            sku, url_key, wishlistItemId, __typename,
        });
    };
    return (
        <>
            <ConfirmationDelete
                open={openDelete}
                handleCancel={() => setOpenDelete(!openDelete)}
                handleYes={handleDelete}
                message={t('wishlist:warningDelete')}
            />
            <div className={styles.card}>
                <div className={styles.imgItem}>
                    <img
                        src={imageSrc}
                        className={styles.imgProduct}
                        alt={name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/img/placeholder.png';
                        }}
                    />
                </div>
                <div className={styles.content}>
                    <Link href="/[...slug]" as={`/${url_key}`}>
                        <a>
                            <Typography variant="p">{name}</Typography>
                        </a>
                    </Link>
                    <PriceFormat variant="p" priceRange={price_range} priceTiers={price_tiers} productType={__typename} />
                    <Button className={styles.btnAdd} onClick={handleAddToCart}>
                        <Typography variant="p" type="bold" letter="uppercase" color="white">
                            {t('wishlist:addToBag')}
                        </Typography>
                    </Button>
                </div>
                <IconButton onClick={() => setOpenDelete(!openDelete)}>
                    <Delete />
                </IconButton>
            </div>
        </>
    );
};
