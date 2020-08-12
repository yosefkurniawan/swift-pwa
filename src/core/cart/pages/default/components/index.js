const Content = (props) => {
    const {
        ItemView, CrossSellView, CheckoutDrawerView, dataCart, t, handleFeed,
        toggleEditMode, editMode, deleteItem, toggleEditDrawer, crosssell,
        EditDrawerView, editItem, openEditDrawer, updateItem,
    } = props;
    return (
        <>
            <ItemView
                data={dataCart}
                t={t}
                toggleEditMode={toggleEditMode}
                editMode={editMode}
                deleteItem={deleteItem}
                handleFeed={handleFeed}
                toggleEditDrawer={toggleEditDrawer}
            />
            <CrossSellView {...props} editMode={editMode} data={crosssell} />
            {editItem.id ? (
                <EditDrawerView {...props} {...editItem} open={openEditDrawer} toggleOpen={toggleEditDrawer} updateItem={updateItem} />
            ) : null}
            <CheckoutDrawerView editMode={editMode} t={t} data={dataCart} />
        </>
    );
};

export default Content;
