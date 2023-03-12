/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import Image from '@common_image';
import Typography from '@common_typography';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';
import useStyles from '@core_modules/cart/pages/default/components/style';
import { updateCartItemNote } from '@core_modules/cart/services/graphql';
import { getCartId } from '@helpers/cartId';
import { formatPrice } from '@helper_currency';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import IconButton from '@material-ui/core/IconButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Zoom from '@material-ui/core/Zoom';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Alert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import Link from 'next/link';

const ItemView = (props) => {
    const {
        t,
        confirmDel,
        handleDelete,
        setConfirmDel,
        product,
        configurable_options,
        quantity,
        prices,
        handleAddWishlist,
        editMode,
        toggleEditDrawer,
        bundle_options,
        links,
        note,
        cartItemId,
        customizable_options,
        storeConfig = {},
        errorCartItems,
        currencyCache,
    } = props;
    const styles = useStyles();

    const storeConfigLocalStorage = useReactiveVar(storeConfigVar);

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    const orderNote = (itemId, notes, qty) => {
        const [actUpdateCartItemNote] = updateCartItemNote();
        let noteParams = notes;
        if (notes !== null) {
            if (notes.length === 0) {
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
                        cart_item_id: parseInt(itemId),
                        note: values.orderNote,
                        quantity: parseFloat(qty),
                    },
                })
                    .then(() => { })
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
                {/* <TableRow> */}
                {/* <TableCell colSpan={3} className={styles.noteItem}> */}
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
                {/* </TableCell> */}
                {/* </TableRow> */}
            </form>
        );
    };

    return (
        <div className={styles.item}>
            <ConfirmationDelete t={t} open={confirmDel} handleDelete={handleDelete} handleCancel={() => setConfirmDel(false)} />
            <div className={styles.itemImgWrapper}>
                <Image
                    src={product.small_image.url}
                    className={styles.itemImg}
                    alt={product.name}
                    width={defaultWidth}
                    height={defaultHeight}
                    quality={80}
                    storeConfig={storeConfig}
                />
                {prices.price_incl_tax.value === 0 ? <span>{t('common:title:free')}</span> : null}
            </div>
            <div className={styles.itemInfo}>
                <Link href="/[...slug]" as={`/${product.url_key}`}>
                    <a className={styles.itemName}>{product.name}</a>
                </Link>
                <div className={styles.itemVariant}>
                    {configurable_options && configurable_options.length > 0 ? <div>{t('common:variant')}</div> : null}
                    {configurable_options
                        ? configurable_options.map((item, idx) => (
                            <div key={idx}>
                                {item.option_label} : {item.value_label}
                            </div>
                        ))
                        : null}
                    {links && links.length > 0 && (
                        <div className="col-xs-12 row option-link-mobile">
                            <Typography variant="span" letter="capitalize" type="bold">
                                Downloads :{' '}
                            </Typography>
                            <div className="column">
                                {links.map((item, idx) => (
                                    <Typography variant="span" letter="capitalize" key={idx}>
                                        {item.title}
                                    </Typography>
                                ))}
                            </div>
                        </div>
                    )}
                    {bundle_options && bundle_options.length ? (
                        <div className="product-options">
                            {bundle_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.label}</strong> :
                                    <div className="option-wrapper__item">
                                        {val.values.map((item, idt) => (
                                            <div key={idt}>
                                                {item.quantity} x{item.label}
                                                {/* <strong>+ {formatPrice(item.price, 'IDR', currencyCache)}</strong> */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {customizable_options && customizable_options.length ? (
                        <div className="product-options">
                            {customizable_options.map((op, idx) => (
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
                    <div>Qty : {quantity}</div>
                    {storeConfigLocalStorage
                        && storeConfigLocalStorage.enable_oms_multiseller
                        && (
                            <div>{orderNote(cartItemId, note, quantity)}</div>
                        )}
                </div>
                { errorCartItems && errorCartItems.length > 0 && errorCartItems[0] === null ? (
                    <Alert severity="error" className="alert m-15">
                        {t('common:cart:oos')}
                    </Alert>
                ) : errorCartItems && errorCartItems.length > 0 && errorCartItems[0] !== null ? (
                    <Alert severity="warning" className="alert m-15">
                        {errorCartItems[0]}
                    </Alert>
                ) : null}
                <div className={styles.itemPrice}>{formatPrice(prices.price_incl_tax.value, prices.price_incl_tax.currency, currencyCache)}</div>
            </div>

            <div className={styles.itemActions}>
                <Zoom in={editMode} style={{ transitionDelay: editMode ? '0ms' : '100ms' }}>
                    <IconButton className={styles.iconBtn} onClick={toggleEditDrawer}>
                        <CreateOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
                <Zoom in={editMode} style={{ transitionDelay: editMode ? '50ms' : '50ms' }}>
                    <IconButton className={styles.iconBtn} onClick={handleAddWishlist}>
                        <FavoriteBorderOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
                <Zoom in={editMode} onClick={() => setConfirmDel(true)} style={{ transitionDelay: editMode ? '100ms' : '0ms' }}>
                    <IconButton className={styles.iconBtn}>
                        <DeleteOutlineOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
            </div>
        </div>
    );
};

export default ItemView;
