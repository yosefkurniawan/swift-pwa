/* eslint-disable max-len */
import useStyles from '@core_modules/customer/pages/wishlist/components/readwishlist/components/style';
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
    const { wishlistItem, t } = props;
    return (
        <div className={styles.container}>
            <TableContainer component={Paper} className={styles.tableContainer}>
                {
                    wishlistItem && wishlistItem.customerWishlist
                    && wishlistItem.customerWishlist.items.length > 0
                    && (
                        <Table className={styles.table} aria-label="a dense table">
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left">Product</TableCell>
                                    <TableCell align="left">Comment</TableCell>
                                    <TableCell align="left">Add to Cart</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <>
                                    {
                                        wishlistItem.customerWishlist.items.map((item) => (
                                            <TableRow className={styles.tableRowResponsive}>
                                                <TableCell
                                                    className={styles.tableCellResponsiveProduct}
                                                    align="left"
                                                    data-th="Product"
                                                >
                                                    <div className={styles.productItem}>
                                                        <ProductItem {...item.product} enableQuickView={false} />
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th="Comment"
                                                />
                                                <TableCell
                                                    className={styles.tableCellResponsive}
                                                    align="left"
                                                    data-th="Action"
                                                >
                                                    <div className={styles.productAction}>
                                                        <div>
                                                            <Button
                                                                onClick={() => { }}
                                                                disabled={false}
                                                                className={styles.btnWishlist}
                                                                align="left"
                                                            >
                                                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                                    Add To Cart
                                                                </Typography>
                                                            </Button>
                                                        </div>
                                                        <Typography
                                                            variant="span"
                                                            type="bold"
                                                            letter="uppercase"
                                                            color="black"
                                                            style={{ marginLeft: 20 }}
                                                        >
                                                            Add To Wishlist
                                                        </Typography>
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
                    onClick={() => { }}
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
