/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import ExpansionPanel from '@material-ui/core/Accordion';
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';
import PaypalButtonView from '@plugin_paypalbutton';
import useStyles from '@plugin_summary/components/BottomSummary/style';
import classNames from 'classnames';
import { useState } from 'react';

const CheckoutDrawer = ({
    editMode,
    t,
    summary,
    handleActionSummary,
    loading,
    disabled,
    showItems = false,
    items = [],
    label = '',
    isLoader,
    deleteCart,
    updateCart,
    withAction,
    dataCart,
    isCart = false,
    storeConfig,
    labelItemAlign = 'left',
    currencyCache,
}) => {
    const styles = useStyles();
    const [expanded, setExpanded] = useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const { data, total } = summary;
    const Loader = () => (
        <>
            <Skeleton variant="text" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
            <Skeleton variant="text" width="80%" height={20} animation="wave" style={{ marginBottom: 10 }} />
            <Skeleton variant="text" width="60%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        </>
    );
    const storeConfigLocalStorage = useReactiveVar(storeConfigVar);

    let cartItemBySeller = {};

    if (items.length > 0) {
        const unGroupedData = items;

        // eslint-disable-next-line no-shadow, object-curly-newline, max-len
        const groupData = unGroupedData.reduce((groupData, { id, quantity, pickup_item_store_info, custom_price, product, custom_seller, ...other }) => {
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
        <Slide direction="up" in={!editMode} mountOnEnter unmountOnExit>
            <div className={styles.checkoutBox} id="bottomSummary">
                <ExpansionPanel expanded={expanded === 1} onChange={handleChange(1)} className={styles.expand}>
                    <ExpansionPanelSummary
                        classes={{
                            root: styles.expanHead,
                            expanded: styles.expandHeadOpen,
                        }}
                    >
                        {expanded === 1 ? <ExpandMore /> : <ExpandLess />}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles.expanBody}>
                        {isLoader ? (
                            <Loader />
                        ) : (
                            <>
                                {showItems && storeConfigLocalStorage.enable_oms_multiseller === '1' ? (
                                    <>
                                        <div className={classNames('row', styles.itemContainer)}>
                                            {cartItemBySeller.map((seller) => (
                                                <>
                                                    <div className={classNames('col-xs-12', styles.sellerLabel)}>
                                                        <Typography variant="span" style={{ fontWeight: 'bold' }}>
                                                            {seller.seller_name}
                                                        </Typography>
                                                    </div>
                                                    {seller.productList.map((item, index) => (
                                                        <div
                                                            className={classNames('col-xs-12 row', styles.bottomListMultiseller)}
                                                            key={index}
                                                            id="bottomListItemProductSummary"
                                                        >
                                                            <div className="col-xs-12 row between-xs clear-margin-padding">
                                                                <div className="col-xs-6">
                                                                    <Typography variant="p" className={styles.productTitle}>
                                                                        {item.product.name}
                                                                    </Typography>
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <Typography variant="p" align="right">
                                                                        {formatPrice(
                                                                            item.prices.row_total_including_tax.value,
                                                                            item.prices.row_total_including_tax.currency || 'IDR',
                                                                            currencyCache
                                                                        )}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <div className={classNames('col-xs-12', styles.qtyOption)}>
                                                                <Typography variant="p">
                                                                    {item.configurable_options && item.configurable_options.length > 0 && (
                                                                        <>
                                                                            {`${t('common:variant')} : ${item.configurable_options.map(
                                                                                (option, key) => {
                                                                                    if (key !== item.configurable_options.length - 1) {
                                                                                        return `${option.value_label} `;
                                                                                    }
                                                                                    return ` ${option.value_label}`;
                                                                                }
                                                                            )}`}
                                                                            <br />
                                                                        </>
                                                                    )}
                                                                    {`${t('common:title:shortQty')} : ${item.quantity}`}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <List className={classNames('col-xs-12', styles.removeBottomPadding)}>
                                                        <ListItem className={classNames(styles.list, styles.listSubtotal)}>
                                                            <ListItemText
                                                                className={styles.labelItem}
                                                                primary={
                                                                    <Typography variant="p" letter="capitalize" size="12" align={labelItemAlign}>
                                                                        Subtotal
                                                                    </Typography>
                                                                }
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Typography variant="span" type="regular">
                                                                    {`${formatPrice(seller.subtotal.value, seller.subtotal.currency, currencyCache)}`}
                                                                </Typography>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    </List>
                                                </>
                                            ))}
                                        </div>
                                        <Divider />
                                    </>
                                ) : null}
                                {showItems && storeConfigLocalStorage.enable_oms_multiseller !== '1' ? (
                                    <>
                                        <div className={classNames('row', styles.itemContainer)}>
                                            {items.map((item, index) => (
                                                <div className="col-xs-12 row" key={index} id="bottomListItemProductSummary">
                                                    <div className="col-xs-12 row between-xs">
                                                        <div className="col-xs-6">
                                                            <Typography variant="p" className={styles.productTitle}>
                                                                {item.product.name}
                                                            </Typography>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <Typography variant="p" align="right">
                                                                {formatPrice(
                                                                    item.prices.row_total_including_tax.value,
                                                                    item.prices.row_total_including_tax.currency || 'IDR',
                                                                    currencyCache
                                                                )}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className={classNames('col-xs-12')}>
                                                        <Typography variant="p">
                                                            {item.configurable_options && item.configurable_options.length > 0 && (
                                                                <>
                                                                    {`${t('common:variant')} : ${item.configurable_options.map((option, key) => {
                                                                        if (key !== item.configurable_options.length - 1) {
                                                                            return `${option.value_label} `;
                                                                        }
                                                                        return ` ${option.value_label}`;
                                                                    })}`}
                                                                    <br />
                                                                </>
                                                            )}
                                                            {`${t('common:title:shortQty')} : ${item.quantity}`}
                                                        </Typography>
                                                    </div>
                                                    {withAction && (
                                                        <div className={classNames('col-xs-12  row between-xs clear-margin-padding', styles.action)}>
                                                            <div className="col-xs-6">
                                                                <span
                                                                    className="item-minus qty-update"
                                                                    onClick={() => {
                                                                        if (item.quantity > 1) {
                                                                            setExpanded(false);
                                                                            updateCart(item.id, item.quantity - 1);
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="item-count">{item.quantity}</span>
                                                                <span
                                                                    className="item-plus qty-update"
                                                                    onClick={() => {
                                                                        setExpanded(false);
                                                                        updateCart(item.id, item.quantity + 1);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className="col-xs-6 delete"
                                                                onClick={() => {
                                                                    setExpanded(0);
                                                                    deleteCart(item.id);
                                                                }}
                                                            >
                                                                <IconButton className="delete-button" color="inherit">
                                                                    <DeleteOutlineOutlined className="icon-delete" />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <Divider />
                                    </>
                                ) : null}
                            </>
                        )}
                        {isLoader ? (
                            <Loader />
                        ) : (
                            <List>
                                {data.map((dt, index) => (
                                    <ListItem className={styles.list} key={index}>
                                        <ListItemText
                                            className={styles.labelItem}
                                            primary={
                                                <Typography variant="p" size="12" letter="capitalize">
                                                    {dt.item}
                                                </Typography>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <Typography variant="span" type="regular">
                                                {dt.value}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                <ListItem className={styles.list}>
                                    <ListItemText
                                        primary={(
                                            <Typography variant="span" type="bold" size="16">
                                                Total
                                            </Typography>
                                        )}
                                    />
                                    <ListItemSecondaryAction>
                                        <Typography variant="span" type="bold" size="16">
                                            {total.currency ? formatPrice(total.value, total.currency, currencyCache) : null}
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {expanded === null || expanded === false ? (
                    <div className={styles.summary}>
                        <Typography variant="span" type="bold" align="center" letter="capitalize" className={styles.subtotal}>
                            Grand Total&nbsp;
                        </Typography>
                        <Typography variant="span" type="bold" align="center" letter="capitalize" className={styles.subtotal}>
                            {total.currency ? formatPrice(total.value, total.currency, currencyCache) : null}
                        </Typography>
                    </div>
                ) : null}
                <div className={styles.actions}>
                    <Button
                        loading={loading}
                        disabled={disabled}
                        customRootStyle={{ width: 'fit-content' }}
                        className={styles.goToCheckout}
                        onClick={handleActionSummary}
                    >
                        <Typography variant="span" color="white" type="bold" letter="uppercase">
                            {label || t('common:button:checkout')}
                        </Typography>
                    </Button>
                    {isCart && dataCart && (
                        <div className={styles.paypalBtn}>
                            <PaypalButtonView cart={dataCart} t={t} storeConfig={storeConfig} />
                        </div>
                    )}
                </div>
            </div>
        </Slide>
    );
};

export default CheckoutDrawer;
