/* eslint-disable max-len */
import useStyles from '@core_modules/customer/pages/sharedwishlist/components/style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import ProductItem from '@plugin_productitem';
import Button from '@common_button';
import Typography from '@common_typography';

const Content = (props) => {
    const styles = useStyles();
    const {
        wishlistItem, t, handleToCart, handleAddAlltoBag, handleFeed,
    } = props;
    /* eslint-disable */
    const handleAddToCart = (item) => {
        handleToCart({
            sku: item.product.sku,
            url_key: item.product.url_key,
            __typename: item.product.__typename,
        });
    }
    /* eslint-enable */
    const setHandleAddAlltoBag = () => {
        const items = [];
        if (wishlistItem && wishlistItem.customerWishlist
            && wishlistItem.customerWishlist.items.length > 0) {
            wishlistItem.customerWishlist.items.map((item) => {
                const data = {
                    sku: item.product.sku,
                    qty: item.qty,
                    wishlistItemId: item.id,
                };
                items.push(data);
                return null;
            });
        }
        if (items.length > 0) {
            handleAddAlltoBag(items);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Typography variant="h6" type="bold" letter="uppercase">
                    {wishlistItem && wishlistItem.customerWishlist && wishlistItem.customerWishlist.name}
                </Typography>
            </div>
            <TableContainer component={Paper} className={styles.tableContainer}>
                {
                    wishlistItem && wishlistItem.customerWishlist
                    && wishlistItem.customerWishlist.items.length > 0
                    && (
                        <Table className={styles.table} aria-label="a dense table">
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left">
                                        <Typography variant="span" type="bold" letter="uppercase">
                                            {t('customer:wishlist:product')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="span" type="bold" letter="uppercase">
                                            {t('customer:wishlist:comment')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="span" type="bold" letter="uppercase">
                                            {t('customer:wishlist:addToCart')}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <>
                                    {
                                        wishlistItem.customerWishlist.items.map((item, index) => (
                                            <TableRow key={index} className={styles.tableRowResponsive}>
                                                <TableCell
                                                    className={styles.tableCellResponsiveProduct}
                                                    align="left"
                                                    data-th={t('customer:wishlist:product')}
                                                >
                                                    <div className={styles.productItem}>
                                                        <ProductItem {...item.product} enableQuickView={false} />
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('customer:wishlist:comment')}
                                                />
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th={t('customer:wishlist:addToCart')}
                                                >
                                                    <div className={styles.productAction}>
                                                        <div>
                                                            <Button
                                                                onClick={() => handleAddToCart(item)}
                                                                disabled={false}
                                                                className={styles.btnWishlist}
                                                                align="left"
                                                            >
                                                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                                    {t('customer:wishlist:addToCart')}
                                                                </Typography>
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button
                                                                className={styles.btnFeedWishlist}
                                                                onClick={() => handleFeed(item.product.id)}
                                                                align="left"
                                                            >
                                                                <Typography
                                                                    variant="span"
                                                                    type="bold"
                                                                    letter="uppercase"
                                                                    style={{ marginLeft: 20 }}
                                                                >
                                                                    {t('customer:wishlist:addToWishlist')}
                                                                </Typography>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </>
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <div className={styles.footerWishlist}>
                <Button
                    onClick={setHandleAddAlltoBag}
                    disabled={false}
                    className={styles.btnWishlist}
                    align="left"
                >
                    <Typography variant="span" type="bold" letter="uppercase" color="white">
                        {t('customer:wishlist:addAllToBag')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default Content;
