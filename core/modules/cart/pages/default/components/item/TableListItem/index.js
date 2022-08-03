/* eslint-disable max-len */
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import Link from 'next/link';
import Image from '@common_image';
import useStyles from '@core_modules/cart/pages/default/components/item/TableListItem/style';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';

const TableListProduct = ({
    data, t, deleteItem, handleFeed, toggleEditDrawer, storeConfig = {},
}) => {
    const styles = useStyles();
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelet] = React.useState(null);
    const confirmDelete = (item) => {
        setConfirmDel(true);
        setSelectDelet(item);
    };
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id: selectDelete.id,
            product: selectDelete.product,
            quantity: selectDelete.quantity,
            prices: selectDelete.prices,
        });
    };

    const cancelDelete = () => {
        setConfirmDel(false);
        setSelectDelet(null);
    };

    const handleAddWishlist = (item) => {
        handleFeed(item);
    };

    const openEdit = (item) => {
        toggleEditDrawer({
            id: item.id,
            quantity: item.quantity,
            product_name: item.product.name,
        });
    };

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    let cartItemBySeller = {};

    if (data) {
        const unGroupedData = data;
        // eslint-disable-next-line no-shadow
        const groupData = unGroupedData.reduce((groupData, {
            SimpleMiniCustomizable, id, note, prices, product, quantity, ...other
        }) => {
            let item = groupData.find((p) => p.name === product.seller.seller_id);
            if (!item) {
                item = { seller_id: product.seller.seller_id, seller_name: product.seller.seller_name, children: [] };
                groupData.push(item);
            }
            let child = item.children.find((ch) => ch.name === product.name);
            if (!child) {
                child = {
                    SimpleMiniCustomizable, id, note, prices, product, quantity, ...other,
                };
                item.children.push(child);
            }
            return groupData;
        }, []);
        cartItemBySeller = groupData;
    }

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <ConfirmationDelete
                t={t}
                open={confirmDel}
                handleDelete={handleDelete}
                handleCancel={cancelDelete}
            />
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" colSpan={3}>
                                <Typography variant="span" type="bold">
                                    Item
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('common:title:price')}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('common:title:shortQty')}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('common:subtotal')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {cartItemBySeller && cartItemBySeller.length > 0 && cartItemBySeller.map((seller) => (
                        <>
                            <TableHead className={styles.tableSellerHead}>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left" colSpan={6} className={styles.tableSellerCell}>
                                        <Typography variant="span" type="bold">
                                            {seller.seller_name ? seller.seller_name : 'Default Store'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {seller && seller.children && seller.children.length > 0 ? (
                                    <>
                                        {
                                            seller.children.map((val, index) => {
                                                const { customizable_options, SimpleMiniCustomizable, ConfigurableMiniCustomizable } = val;
                                                const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
                                                return (
                                                    <React.Fragment key={index}>
                                                        <TableRow className={styles.tableRowResponsive} key={index}>
                                                            <TableCell>
                                                                <Checkbox
                                                                    checked={checked}
                                                                    onChange={handleChange}
                                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                />
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                rowSpan={2}
                                                            >
                                                                <div className={styles.productImgContainer}>
                                                                    <Link
                                                                        href="/[...slug]"
                                                                        as={`/${val.product.url_key}`}
                                                                    >
                                                                        <a>
                                                                            <Image
                                                                                src={val.product.small_image.url}
                                                                                className={styles.productImg}
                                                                                alt={val.product.name}
                                                                                width={defaultWidth}
                                                                                height={defaultHeight}
                                                                                quality={80}
                                                                            />
                                                                        </a>
                                                                    </Link>
                                                                    {
                                                                        val.prices.price.value === 0 ? (
                                                                            <span>Free</span>
                                                                        ) : null
                                                                    }
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                align="left"
                                                                className={styles.noBorder}
                                                            >
                                                                <div className="row">
                                                                    <div className="col-xs-12">
                                                                        <Link
                                                                            href="/[...slug]"
                                                                            as={`/${val.product.url_key}`}
                                                                        >
                                                                            <a>
                                                                                <Typography variant="span" letter="capitalize">
                                                                                    {val.product.name}
                                                                                </Typography>
                                                                            </a>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-xs-12 column">
                                                                        {val.configurable_options ? val.configurable_options.map((item, idx) => (
                                                                            <Typography variant="span" letter="capitalize" key={idx}>
                                                                                <strong>{item.option_label}</strong>
                                                                                {' '}
                                                                                :
                                                                                {' '}
                                                                                {item.value_label}
                                                                            </Typography>
                                                                        )) : null}
                                                                    </div>
                                                                    {
                                                                        val.links && val.links.length > 0 && (
                                                                            <div className="col-xs-12 row option-link">
                                                                                <Typography variant="span" letter="capitalize" type="bold">
                                                                                    Downloads :
                                                                                    {' '}
                                                                                </Typography>
                                                                                <div className="column">
                                                                                    {val.links.map((item, idx) => (
                                                                                        <Typography variant="span" letter="capitalize" key={idx}>
                                                                                            {item.title}
                                                                                        </Typography>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                {val.bundle_options && val.bundle_options.length ? (
                                                                    <div className="product-options">
                                                                        {val.bundle_options.map((value, idx) => (
                                                                            <div className="option-wrapper" key={idx}>
                                                                                <strong>{value.label}</strong>
                                                                                {' '}
                                                                                :
                                                                                <div className="option-wrapper__item">
                                                                                    {value.values.map((item, idt) => (
                                                                                        <div key={idt}>
                                                                                            {item.quantity}
                                                                                            {' '}
                                                                                            x
                                                                                            {item.label}
                                                                                            {' '}
                                                                                            <strong>
                                                                                                + $
                                                                                                {item.price}
                                                                                            </strong>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : null}
                                                                {val.bundle_options && val.bundle_options.length ? (
                                                                    <div className="product-options">
                                                                        {val.bundle_options.map((bundle, idb) => (
                                                                            <div className="option-wrapper" key={idb}>
                                                                                <strong>{bundle.label}</strong>
                                                                                {' '}
                                                                                :
                                                                                <div className="option-wrapper__item">
                                                                                    {bundle.values.map((item, idt) => (
                                                                                        <div key={idt}>
                                                                                            {item.quantity}
                                                                                            {' '}
                                                                                            x
                                                                                            {item.label}
                                                                                            {' '}
                                                                                            <strong>
                                                                                                + $
                                                                                                {item.price}
                                                                                            </strong>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : null}
                                                                {cartCustomOptions && cartCustomOptions.length ? (
                                                                    <div className="product-options">
                                                                        {cartCustomOptions.map((op, idx) => (
                                                                            <div className="option-wrapper" key={idx}>
                                                                                <div className="row option-wrapper__item">
                                                                                    <strong>
                                                                                        {op.label}
                                                                                        {' '}
                                                                                        :
                                                                                    </strong>
                                                                                    {op.values.map((item, idt) => (
                                                                                        <p key={idt} className="option-item">
                                                                                            {(item.label && item.label !== '') ? item.label : item.value}
                                                                                        </p>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : null}
                                                            </TableCell>
                                                            <TableCell
                                                                align="right"
                                                                className={styles.noBorder}
                                                            >
                                                                <Typography variant="span" align="right" letter="capitalize">
                                                                    {formatPrice(
                                                                        val.prices.row_total_including_tax.value,
                                                                        val.prices.row_total_including_tax.currency || 'IDR',
                                                                    )}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell
                                                                align="right"
                                                                className={styles.noBorder}
                                                            >
                                                                <Typography id="plugin-tableCart-itemQty" variant="span" align="right" letter="capitalize">
                                                                    {val.quantity}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell
                                                                align="right"
                                                                className={styles.noBorder}
                                                            >
                                                                <Typography variant="span" align="right" letter="capitalize">
                                                                    {formatPrice(
                                                                        val.prices.row_total_including_tax.value,
                                                                        val.prices.row_total_including_tax.currency,
                                                                    )}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            {(val && val.product.stock_status === 'OUT_OF_STOCK') ? (
                                                                <>
                                                                    <TableCell colSpan={3}>
                                                                        <Alert severity="error" style={{ width: '11vw' }}>
                                                                            {t('cart:oos')}
                                                                        </Alert>
                                                                    </TableCell>
                                                                </>
                                                            ) : (<TableCell colSpan={3} />)}
                                                            <TableCell
                                                                align="right"
                                                            >
                                                                <div>
                                                                    <IconButton
                                                                        id="cart-tableCart-editCartBtn"
                                                                        className={styles.iconBtn}
                                                                        onClick={() => openEdit(val)}
                                                                    >
                                                                        <CreateOutlined fontSize="small" className={styles.icon} />
                                                                    </IconButton>
                                                                    <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                                        <FavoriteBorderOutlined fontSize="small" className={styles.icon} />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        id="cart-tableCart-removeCartBtn"
                                                                        className={styles.iconBtn}
                                                                        onClick={() => confirmDelete(val)}
                                                                    >
                                                                        <DeleteOutlineOutlined fontSize="small" className={styles.icon} />
                                                                    </IconButton>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Alert severity="warning">{t('order:notFound')}</Alert>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </>
                    ))}
                </Table>
            </TableContainer>
        </>
    );
};

export default TableListProduct;
