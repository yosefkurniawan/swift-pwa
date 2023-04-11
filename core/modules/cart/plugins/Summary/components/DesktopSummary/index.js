/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Thumbor from '@common_image';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import React from 'react';

import PaypalButtonView from '@plugin_paypalbutton';
import useStyles from '@plugin_summary/components/DesktopSummary/style';

const Summary = (props) => {
    const {
        t, summary, handleActionSummary = () => { }, loading, disabled,
        showItems = false, items = [], hideButton = false, isDesktop,
        isLoader, deleteCart, updateCart, withAction, withLabel = true,
        labelItemAlign = 'left', dataCart, storeConfig, currencyCache, loadTotal,
    } = props;
    const styles = useStyles();
    const storeConfigLocalStorage = useReactiveVar(storeConfigVar);
    const [openItem, setOpenItem] = React.useState(false);
    const Loader = () => (
        <div id="desktopSummary" className={isDesktop ? classNames(styles.container, 'hidden-mobile') : styles.container}>
            <Typography variant="h1" type="regular" letter="capitalize">
                {t('common:summary:title')}
            </Typography>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <ListItemText
                    primary={(
                        <Typography variant="title" type="bold">
                            Total
                        </Typography>
                    )}
                />
                <Skeleton variant="rect" width="60%" height="30px" animation="wave" />
            </ListItem>
        </div>
    );
    if (isLoader) {
        return <Loader />;
    }

    let cartItemBySeller = {};

    if (items.length > 0) {
        const unGroupedData = items;

        // eslint-disable-next-line no-shadow
        const groupData = unGroupedData.reduce((groupData, {
            id,
            quantity,
            pickup_item_store_info,
            custom_price,
            product,
            custom_seller,
            ...other
        }) => {
            let item = groupData.find((p) => p.seller_id === custom_seller.seller_id);
            if (!item) {
                item = {
                    seller_id: custom_seller.seller_id,
                    seller_name: custom_seller.seller_name ? custom_seller.seller_name : 'Default Seller',
                    productList: [],
                    subtotal: {
                        currency: '',
                        value: 0,
                    },
                };
                groupData.push(item);
            }
            let child = item.productList.find((ch) => ch.name === product.name);
            if (!child) {
                child = {
                    id,
                    custom_price,
                    product,
                    quantity,
                    ...other,
                };
                item.productList.push(child);
                item.subtotal.currency = custom_price?.row_total_incl_tax.currency;
                item.subtotal.value += custom_price?.row_total_incl_tax.value;
            }
            return groupData;
        }, []);
        cartItemBySeller = groupData;
    }

    return (
        <div id="desktopSummary" className={isDesktop ? classNames(styles.container, 'hidden-mobile') : styles.container}>
            {withLabel && (
                <Typography variant="span" type="regular" letter="capitalize" style={{ fontSize: '24px' }}>
                    {t('common:summary:title')}
                </Typography>
            )}
            {showItems ? (
                <>
                    <div className={classNames('row between-xs')} onClick={() => setOpenItem(!openItem)}>
                        <div className="col-xs-6">
                            <Typography variant="span">{`${items.length} items in Cart`}</Typography>
                        </div>
                        <div className="col-xs-2">{openItem ? <ExpandLess /> : <ExpandMore />}</div>
                    </div>
                    {storeConfigLocalStorage.enable_oms_multiseller === '1' && openItem ? (
                        <div className={classNames('row')}>
                            {
                                cartItemBySeller.map((seller) => (
                                    <>
                                        <div className={classNames('col-xs-12', styles.sellerLabel)}>
                                            <Typography variant="span" style={{ fontWeight: 'bold' }}>{seller.seller_name}</Typography>
                                        </div>
                                        {seller.productList.map((item, index) => (
                                            <div
                                                id="listItemProductSummary"
                                                className={classNames('col-xs-12 row between-xs', styles.list, styles.listProduct)}
                                                key={index}
                                            >
                                                <div className="col-xs-4">
                                                    <Thumbor
                                                        className="product-image-photo"
                                                        src={item.product.small_image.url}
                                                        alt={item.product.name}
                                                        width={61}
                                                        height={75}
                                                    />
                                                </div>
                                                <div className={classNames('col-xs-8', styles.bodyProductItem)}>
                                                    <Typography variant="span" className={styles.productTitle}>{item.product.name}</Typography>
                                                    {item.configurable_options && item.configurable_options.length ? (
                                                        <div className="product-options">
                                                            {item.configurable_options.map((val, idx) => (
                                                                <div className="option-wrapper" key={idx}>
                                                                    <strong>{val.option_label}</strong>
                                                                    {' '}
                                                                    :
                                                                    {val.value_label}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                    <div className="flex-grow" />
                                                    <div>
                                                        <span className="item-count" style={{ padding: '0' }}>
                                                            <Typography variant="span" type="regular">
                                                                Qty:
                                                                {` ${item.quantity}`}
                                                            </Typography>
                                                        </span>
                                                    </div>
                                                    <Typography variant="span" size="14" letter="uppercase">
                                                        {item.prices.row_total.value === 0
                                                            ? t('common:title:free')
                                                            : formatPrice(item.prices.row_total.value, item.prices.row_total.currency || 'IDR', currencyCache)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))}
                                        <List className={classNames('col-xs-12', styles.removeBottomPadding)}>
                                            <ListItem className={classNames(styles.list, styles.listSubtotal)}>
                                                <ListItemText
                                                    className={styles.labelItem}
                                                    primary={(
                                                        <Typography variant="p" letter="capitalize" size="12" align={labelItemAlign}>
                                                            Subtotal
                                                        </Typography>
                                                    )}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography variant="span" type="regular">
                                                        {`${formatPrice(seller.subtotal.value, seller.subtotal.currency, currencyCache)}`}
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </>
                                ))
                            }
                        </div>
                    ) : null}
                    {storeConfigLocalStorage.enable_oms_multiseller !== '1' && openItem ? (
                        <div className={classNames('row')}>
                            {items.map((item, index) => (
                                <div
                                    id="listItemProductSummary"
                                    className={classNames('col-xs-12 row between-xs', styles.list, styles.listProduct)}
                                    key={index}
                                >
                                    {withAction && (
                                        <div
                                            className="delete"
                                            onClick={() => {
                                                deleteCart(item.id);
                                            }}
                                        >
                                            x
                                        </div>
                                    )}
                                    <div className="col-xs-4">
                                        <Thumbor
                                            className="product-image-photo"
                                            src={item.product.small_image.url}
                                            alt={item.product.name}
                                            width={61}
                                            height={75}
                                            storeConfig={storeConfig}
                                        />
                                    </div>
                                    <div className={classNames('col-xs-8', styles.bodyProductItem)}>
                                        <Typography variant="span" className={styles.productTitle}>{item.product.name}</Typography>
                                        {item.configurable_options && item.configurable_options.length ? (
                                            <div className="product-options">
                                                {item.configurable_options.map((val, idx) => (
                                                    <div className="option-wrapper" key={idx}>
                                                        <strong>{val.option_label}</strong>
                                                        {' '}
                                                        :
                                                        {val.value_label}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}
                                        <div className="flex-grow" />
                                        {withAction && (
                                            <div>
                                                <span
                                                    className="item-minus qty-update"
                                                    onClick={() => {
                                                        if (item.quantity > 1) {
                                                            updateCart(item.id, item.quantity - 1);
                                                        }
                                                    }}
                                                />
                                                <span className="item-count">{item.quantity}</span>

                                                <span
                                                    className="item-plus qty-update"
                                                    onClick={() => {
                                                        updateCart(item.id, item.quantity + 1);
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <Typography variant="span" size="14" letter="uppercase">
                                            {item.prices.row_total.value === 0
                                                ? t('common:title:free')
                                                : formatPrice(item.prices.row_total.value, item.prices.row_total.currency || 'IDR', currencyCache)}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </>
            ) : null}
            <List>
                {summary.data.map((dt, index) => (
                    <ListItem className={classNames(styles.list, styles.listSummary)} key={index}>
                        <ListItemText
                            className={styles.labelItem}
                            primary={(
                                <Typography variant="p" letter="capitalize" size="12" align={labelItemAlign}>
                                    {dt.item}
                                </Typography>
                            )}
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="span" type="regular">
                                {dt.value}
                                {/* {`${formatPrice(dt.value, currencyCache)}`} */}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
                {
                    loadTotal
                        ? (
                            <ListItem className={classNames(styles.list, 'listSummary')}>
                                <ListItemText
                                    primary={(
                                        <Typography variant="title" type="bold">
                                            Total
                                        </Typography>
                                    )}
                                />
                                <Skeleton variant="rect" width="60%" height="30px" animation="wave" />
                            </ListItem>
                        ) : (
                            <ListItem className={classNames(styles.list, styles.listSummary, styles.listItemGrandtotal)}>
                                <ListItemText
                                    className={styles.labelItem}
                                    primary={(
                                        <Typography variant="span" type="bold" align={labelItemAlign} size="16">
                                            Total
                                        </Typography>
                                    )}
                                />
                                <ListItemSecondaryAction>
                                    <Typography variant="span" type="bold" size="16">
                                        {summary.total.currency ? formatPrice(summary.total.value, summary.total.currency, currencyCache) : null}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                }
            </List>
            <div className={styles.footer}>
                {
                    !hideButton ? (
                        <Button
                            loading={loading}
                            disabled={disabled}
                            className={classNames(styles.btnCheckout, 'plugin-cart-checkoutBtn')}
                            onClick={handleActionSummary}
                        >
                            <Typography variant="span" color="white" type="bold" letter="uppercase">
                                {t('common:button:checkout')}
                            </Typography>
                        </Button>
                    ) : null
                }
                {
                    !hideButton && dataCart && (
                        <div className={styles.paypalBtn}>
                            <PaypalButtonView cart={dataCart} t={t} storeConfig={storeConfig} />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Summary;
