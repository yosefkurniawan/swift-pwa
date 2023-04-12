/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
// import Button from '@common_button';
// import TextField from '@common_forms/TextField';
import Image from '@common_image';
import Typography from '@common_typography';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';
import useStyles from '@core_modules/cart/pages/default/components/item/TableListItem/style';
import { updateCartItemNote } from '@core_modules/cart/services/graphql';
import { getCartId } from '@helpers/cartId';
import { formatPrice } from '@helper_currency';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Alert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';

const TableListProduct = ({ data, t, deleteItem, handleFeed, toggleEditDrawer, storeConfig = {}, currencyCache, }) => {
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
            prices: selectDelete.custom_price,
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
        const groupData = unGroupedData.reduce((groupData, { SimpleMiniCustomizable, id, note, custom_price, product, quantity, custom_seller, ...other }) => {
            let item = groupData.find((p) => p.seller_id === custom_seller.seller_id);
            if (!item) {
                item = { seller_id: custom_seller.seller_id, seller_name: custom_seller.seller_name, children: [] };
                groupData.push(item);
            }
            let child = item.children.find((ch) => ch.name === product.name);
            if (!child) {
                child = {
                    SimpleMiniCustomizable,
                    id,
                    note,
                    custom_price,
                    product,
                    quantity,
                    ...other,
                };
                item.children.push(child);
            }
            return groupData;
        }, []);
        cartItemBySeller = groupData;
    }

    const orderNote = (cartItemId, note, quantity) => {
        const [actUpdateCartItemNote] = updateCartItemNote();
        let noteParams = note;
        if (note !== null) {
            if (note.length === 0) {
                noteParams = null;
            }
        }
        const [activeNoteItem, setActiveNoteItem] = React.useState(noteParams !== null);
        const cartId = getCartId();
        const formik = useFormik({
            initialValues: {
                orderNote: note || '',
            },
            onSubmit: (values) => {
                actUpdateCartItemNote({
                    variables: {
                        cartId,
                        cart_item_id: parseInt(cartItemId),
                        note: values.orderNote,
                        quantity: parseFloat(quantity),
                    },
                })
                    .then(() => {})
                    .catch(() => {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: `${t('cart:failedSaveOrderNote')}`,
                        });
                    });
            },
        });

        const maxChar = { value: '255' };

        return (
            <form onSubmit={formik.handleSubmit}>
                <TableRow>
                    <TableCell colSpan={3} className={styles.noteItem}>
                        <a>
                            <Typography
                                className={activeNoteItem === true ? styles.itemNoteLinkHidden : styles.itemNoteLink}
                                onClick={() => setActiveNoteItem(true)}
                            >
                                {t('cart:addANote')}
                            </Typography>
                        </a>
                        <Typography className={activeNoteItem === true ? styles.itemNote : styles.itemNoteHidden}>
                            {`${t('cart:itemNote')} - ${t('cart:maxChar', { maxChar })}`}
                        </Typography>
                        <TextareaAutosize
                            label="Order Note"
                            name="orderNote"
                            value={formik.values.orderNote}
                            onChange={formik.handleChange}
                            onBlur={() => {
                                if (formik.values.orderNote === '') {
                                    setActiveNoteItem(false);
                                }
                                formik.submitForm();
                            }}
                            maxLength={255}
                            minRows={2}
                            rows={2}
                            className={activeNoteItem === true ? styles.itemNoteTextarea : styles.itemNoteHidden}
                        />
                    </TableCell>
                </TableRow>
            </form>
        );
    };

    return (
        <>
            <ConfirmationDelete t={t} open={confirmDel} handleDelete={handleDelete} handleCancel={cancelDelete} />
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" colSpan={2}>
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
                    {storeConfig && storeConfig.enable_oms_multiseller !== '1' && (
                        <TableBody>
                            {data && data.length > 0 ? (
                                <>
                                    {data.map((val, index) => {
                                        const { customizable_options, SimpleMiniCustomizable, ConfigurableMiniCustomizable } = val;
                                        const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
                                        return (
                                            <React.Fragment key={index}>
                                                <TableRow className={styles.tableRowResponsive} key={index}>
                                                    <TableCell align="center" rowSpan={2}>
                                                        <div className={styles.productImgContainer}>
                                                            <Link href="/[...slug]" as={`/${val.product.url_key}`}>
                                                                <a>
                                                                    <Image
                                                                        src={val.product.small_image.url}
                                                                        className={styles.productImg}
                                                                        alt={val.product.name}
                                                                        width={defaultWidth}
                                                                        height={defaultHeight}
                                                                        quality={80}
                                                                        storeConfig={storeConfig}
                                                                    />
                                                                </a>
                                                            </Link>
                                                            {val.custom_price.price_incl_tax.value === 0 ? <span>Free</span> : null}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="left" className={styles.noBorder}>
                                                        <div className="row">
                                                            <div className="col-xs-12">
                                                                <Link href="/[...slug]" as={`/${val.product.url_key}`}>
                                                                    <a>
                                                                        <Typography variant="span" letter="capitalize" className={styles.productTitle}>
                                                                            {val.product.name}
                                                                        </Typography>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                            <div className="col-xs-12 column">
                                                                {val.configurable_options
                                                                    ? val.configurable_options.map((item, idx) => (
                                                                          <Typography variant="span" letter="capitalize" key={idx}>
                                                                              <strong>{item.option_label}</strong> : {item.value_label}
                                                                          </Typography>
                                                                      ))
                                                                    : null}
                                                            </div>
                                                            {val.links && val.links.length > 0 && (
                                                                <div className="col-xs-12 row option-link">
                                                                    <Typography variant="span" letter="capitalize" type="bold">
                                                                        Downloads :{' '}
                                                                    </Typography>
                                                                    <div className="column">
                                                                        {val.links.map((item, idx) => (
                                                                            <Typography variant="span" letter="capitalize" key={idx}>
                                                                                {item.title}
                                                                            </Typography>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {val.bundle_options && val.bundle_options.length ? (
                                                            <div className="product-options">
                                                                {val.bundle_options.map((value, idx) => (
                                                                    <div className="option-wrapper" key={idx}>
                                                                        <strong>{value.label}</strong> :
                                                                        <div className="option-wrapper__item">
                                                                            {value.values.map((item, idt) => (
                                                                                <div key={idt}>
                                                                                    {item.quantity} x{item.label} <strong>+ {formatPrice(item.price, 'IDR', currencyCache)}</strong>
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
                                                                        <strong>{bundle.label}</strong> :
                                                                        <div className="option-wrapper__item">
                                                                            {bundle.values.map((item, idt) => (
                                                                                <div key={idt}>
                                                                                    {item.quantity} x{item.label} <strong>+ {formatPrice(item.price, 'IDR', currencyCache)}</strong>
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
                                                                            <strong>{op.label} :</strong>
                                                                            {op.values.map((item, idt) => (
                                                                                <p key={idt} className="option-item">
                                                                                    {item.label && item.label !== '' ? item.label : item.value}
                                                                                </p>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </TableCell>
                                                    <TableCell align="right" className={styles.noBorder}>
                                                        <Typography variant="span" align="right" letter="capitalize">
                                                            {formatPrice(
                                                                val.custom_price?.price_incl_tax?.value || 0,
                                                                val.custom_price?.price_incl_tax?.currency || 'IDR',
                                                                currencyCache
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right" className={styles.noBorder}>
                                                        <Typography id="plugin-tableCart-itemQty" variant="span" align="right" letter="capitalize">
                                                            {val.quantity}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right" className={styles.noBorder}>
                                                        <Typography variant="span" align="right" letter="capitalize">
                                                            {formatPrice(
                                                                val.custom_price.row_total_incl_tax.value,
                                                                val.custom_price.row_total_incl_tax.currency,
                                                                currencyCache
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    {/* <TableCell
                                                            align="center"
                                                        >
                                                            <div className="row center-xs" style={{ maxWidth: 100 }}>
                                                                <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                                    <IconButton
                                                                        className={styles.iconBtn}
                                                                        onClick={() => openEdit(val)}
                                                                    >
                                                                        <CreateOutlined className={styles.icon} />
                                                                    </IconButton>
                                                                </div>
                                                                <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                                    <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                                        <FavoriteBorderOutlined className={styles.icon} />
                                                                    </IconButton>
                                                                </div>
                                                                <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                                    <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                                        <DeleteOutlineOutlined className={styles.icon} />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        </TableCell> */}
                                                </TableRow>
                                                <TableRow>
                                                    {val && val.product.stock_status === 'OUT_OF_STOCK' ? (
                                                        <>
                                                            <TableCell colSpan={3}>
                                                                <Alert severity="error" style={{ width: '11vw' }}>
                                                                    {t('cart:oos')}
                                                                </Alert>
                                                            </TableCell>
                                                        </>
                                                    ) : val && val.errorCartItems && val.errorCartItems.length > 0 ? (
                                                        <TableCell colSpan={3}>
                                                            <Alert severity="warning">
                                                                {val.errorCartItems[0]}
                                                            </Alert>
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell colSpan={3} />
                                                    )}
                                                    <TableCell align="right">
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
                                    })}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Alert severity="warning">{t('order:notFound')}</Alert>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                    {storeConfig &&
                        storeConfig.enable_oms_multiseller === '1' &&
                        cartItemBySeller &&
                        cartItemBySeller.length > 0 &&
                        cartItemBySeller.map((seller) => (
                            <>
                                <TableHead className={styles.tableSellerHead}>
                                    <TableRow className={styles.tableRowHead}>
                                        <TableCell align="left" colSpan={5} className={styles.tableSellerCell}>
                                            <Typography variant="span" type="bold">
                                                {seller.seller_name ? seller.seller_name : 'Default Store'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {seller && seller.children && seller.children.length > 0 ? (
                                        <>
                                            {seller.children.map((val, index) => {
                                                const { customizable_options, SimpleMiniCustomizable, ConfigurableMiniCustomizable } = val;
                                                const cartCustomOptions =
                                                    SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
                                                return (
                                                    <React.Fragment key={index}>
                                                        <TableRow className={styles.tableRowResponsive} key={index}>
                                                            <TableCell align="center" rowSpan={2} className={styles.noBorder}>
                                                                <div className={styles.productImgContainer}>
                                                                    <Link href="/[...slug]" as={`/${val.product.url_key}`}>
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
                                                                    {val.custom_price.price_incl_tax.value === 0 ? <span>Free</span> : null}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell align="left" className={styles.noBorder}>
                                                                <div className="row">
                                                                    <div className="col-xs-12">
                                                                        <Link href="/[...slug]" as={`/${val.product.url_key}`}>
                                                                            <a>
                                                                                <Typography variant="span" letter="capitalize" className={styles.productTitle}>
                                                                                    {val.product.name}
                                                                                </Typography>
                                                                            </a>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-xs-12 column">
                                                                        {val.configurable_options
                                                                            ? val.configurable_options.map((item, idx) => (
                                                                                  <Typography variant="span" letter="capitalize" key={idx}>
                                                                                      <strong>{item.option_label}</strong> : {item.value_label}
                                                                                  </Typography>
                                                                              ))
                                                                            : null}
                                                                    </div>
                                                                    {val.links && val.links.length > 0 && (
                                                                        <div className="col-xs-12 row option-link">
                                                                            <Typography variant="span" letter="capitalize" type="bold">
                                                                                Downloads :{' '}
                                                                            </Typography>
                                                                            <div className="column">
                                                                                {val.links.map((item, idx) => (
                                                                                    <Typography variant="span" letter="capitalize" key={idx}>
                                                                                        {item.title}
                                                                                    </Typography>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {val.bundle_options && val.bundle_options.length ? (
                                                                    <div className="product-options">
                                                                        {val.bundle_options.map((value, idx) => (
                                                                            <div className="option-wrapper" key={idx}>
                                                                                <strong>{value.label}</strong> :
                                                                                <div className="option-wrapper__item">
                                                                                    {value.values.map((item, idt) => (
                                                                                        <div key={idt}>
                                                                                            {item.quantity} x{item.label}{' '}
                                                                                            <strong>+ ${item.price}</strong>
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
                                                                                <strong>{bundle.label}</strong> :
                                                                                <div className="option-wrapper__item">
                                                                                    {bundle.values.map((item, idt) => (
                                                                                        <div key={idt}>
                                                                                            {item.quantity} x{item.label}{' '}
                                                                                            <strong>+ ${item.price}</strong>
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
                                                                                    <strong>{op.label} :</strong>
                                                                                    {op.values.map((item, idt) => (
                                                                                        <p key={idt} className="option-item">
                                                                                            {item.label && item.label !== ''
                                                                                                ? item.label
                                                                                                : item.value}
                                                                                        </p>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : null}
                                                            </TableCell>
                                                            <TableCell align="right" className={styles.noBorder}>
                                                                <Typography variant="span" align="right" letter="capitalize">
                                                                    {formatPrice(
                                                                        val.custom_price?.price_incl_tax?.value || 0,
                                                                        val.custom_price?.price_incl_tax?.currency || 'IDR', currencyCache
                                                                    )}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right" className={styles.noBorder}>
                                                                <Typography
                                                                    id="plugin-tableCart-itemQty"
                                                                    variant="span"
                                                                    align="right"
                                                                    letter="capitalize"
                                                                >
                                                                    {val.quantity}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right" className={styles.noBorder}>
                                                                <Typography variant="span" align="right" letter="capitalize">
                                                                    {formatPrice(
                                                                        val.custom_price.row_total_incl_tax.value,
                                                                        val.custom_price.row_total_incl_tax.currency, currencyCache
                                                                    )}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            {val && val.product.stock_status === 'OUT_OF_STOCK' ? (
                                                                <>
                                                                    <TableCell colSpan={3}>
                                                                        <Alert severity="error" style={{ width: '11vw' }}>
                                                                            {t('cart:oos')}
                                                                        </Alert>
                                                                    </TableCell>
                                                                </>
                                                            ) : val && val.errorCartItems && val.errorCartItems.length > 0 ? (
                                                        <TableCell colSpan={3}>
                                                            <Alert severity="warning">
                                                                {val.errorCartItems[0]}
                                                            </Alert>
                                                        </TableCell>
                                                        ) : (
                                                                <TableCell colSpan={3} className={styles.noBorder} />
                                                            )}
                                                            <TableCell align="right" className={styles.noBorder}>
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
                                                        <TableRow>
                                                            <TableCell colSpan={6} className={styles.noBorder}>
                                                                {orderNote(val.id, val.note, val.quantity)}
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                );
                                            })}
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
