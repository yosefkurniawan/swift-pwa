/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
import Button from '@common_button';
import Typography from '@common_typography';
import Item from '@core_modules/cart/pages/default/components/item/item';
import TableList from '@core_modules/cart/pages/default/components/item/TableListItem';
import useStyles from '@core_modules/cart/pages/default/components/style';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import classNames from 'classnames';
import { useState } from 'react';

const ItemProduct = (props) => {
    const {
        t,
        editMode,
        toggleEditDrawer,
        cartItemId,
        product,
        quantity,
        configurable_options = [],
        deleteItem,
        custom_price,
        handleFeed,
        bundle_options,
        links,
        customizable_options,
        SimpleMiniCustomizable,
        ConfigurableMiniCustomizable,
        note,
        errorCartItems,
        storeConfig,
        currencyCache,
    } = props;
    const [confirmDel, setConfirmDel] = useState(false);
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id: props.id,
            product: props.product,
            quantity: props.quantity,
            prices: props.custom_price,
        });
    };

    const handleAddWishlist = () => {
        handleFeed(props);
    };
    return (
        <Item
            t={t}
            note={note}
            errorCartItems={errorCartItems}
            cartItemId={cartItemId}
            confirmDel={confirmDel}
            handleDelete={handleDelete}
            handleAddWishlist={handleAddWishlist}
            setConfirmDel={setConfirmDel}
            product={product}
            configurable_options={configurable_options}
            bundle_options={bundle_options}
            links={links}
            quantity={quantity}
            prices={custom_price}
            editMode={editMode}
            toggleEditDrawer={toggleEditDrawer}
            customizable_options={SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options}
            storeConfig={storeConfig}
            currencyCache={currencyCache}
        />
    );
};

const ItemView = (props) => {
    const styles = useStyles();
    const { data, t, toggleEditMode, editMode, deleteItem, handleFeed, toggleEditDrawer, currencyCache, ...other } = props;
    const storeConfigLocalStorage = useReactiveVar(storeConfigVar);
    let cartItemBySeller = {};

    if (storeConfigLocalStorage && storeConfigLocalStorage.enable_oms_multiseller && data && data.items) {
        const unGroupedData = data.items;
        // eslint-disable-next-line no-shadow, max-len
        const groupData = unGroupedData.reduce((groupData, { SimpleMiniCustomizable, id, note, prices, product, quantity, custom_seller, ...other }) => {
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
                    prices,
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

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.toolbarCounter}>
                    <Typography variant="p" type="regular">
                        <span>{data.total_quantity}</span> {t('cart:counter:text')}
                    </Typography>
                </div>
                <div className={classNames(styles.toolbarActions, 'hidden-desktop')}>
                    <Button variant="outlined" className={styles.toolbarButton} onClick={toggleEditMode}>
                        {editMode ? <>{t('common:button:save')}</> : <>{t('common:button:edit')}</>}
                    </Button>
                </div>
            </div>
            <div className={classNames(styles.items, 'hidden-desktop')}>
                {storeConfigLocalStorage &&
                    storeConfigLocalStorage.enable_oms_multiseller &&
                    cartItemBySeller.map((seller) => (
                        <>
                            <Typography variant="h4" type="regular" className={styles.sellerName}>
                                <span>{seller.seller_name ? seller.seller_name : 'Default Store'}</span>
                            </Typography>
                            {seller.children.map((item, index) => (
                                <ItemProduct
                                    {...item}
                                    cartItemId={item.id}
                                    key={index}
                                    t={t}
                                    editMode={editMode}
                                    toggleEditDrawer={() =>
                                        toggleEditDrawer({
                                            id: item.id,
                                            quantity: item.quantity,
                                            product_name: item.product.name,
                                        })
                                    }
                                    deleteItem={deleteItem}
                                    handleFeed={handleFeed}
                                    currencyCache={currencyCache}
                                    {...other}
                                />
                            ))}
                        </>
                    ))}
                {storeConfigLocalStorage &&
                    !storeConfigLocalStorage.enable_oms_multiseller &&
                    data.items.map((item, idx) => (
                        <ItemProduct
                            {...item}
                            cartItemId={item.id}
                            key={idx}
                            t={t}
                            editMode={editMode}
                            toggleEditDrawer={() =>
                                toggleEditDrawer({
                                    id: item.id,
                                    quantity: item.quantity,
                                    product_name: item.product.name,
                                })
                            }
                            deleteItem={deleteItem}
                            handleFeed={handleFeed}
                            currencyCache={currencyCache}
                            {...other}
                        />
                    ))}
            </div>
            <div className="hidden-mobile">
                <TableList
                    data={data.items}
                    t={t}
                    deleteItem={deleteItem}
                    handleFeed={handleFeed}
                    toggleEditDrawer={toggleEditDrawer}
                    currencyCache={currencyCache}
                    {...other}
                />
            </div>
        </div>
    );
};

export default ItemView;
