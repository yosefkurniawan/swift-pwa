const Content = (props) => {
    const {
        ItemView, CrossSellView, CheckoutDrawerView, dataCart, t, handleFeed,
        toggleEditMode, editMode, deleteItem, toggleEditDrawer, crosssell,
        EditDrawerView, editItem, openEditDrawer, updateItem, SummaryView, ...other
    } = props;
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-9" style={{ height: '100%' }}>
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
                <div className="hidden-desktop">
                    <CheckoutDrawerView editMode={editMode} t={t} data={dataCart} {...other} />
                </div>
            </div>
            <div className="col-xs-12 col-sm-3 hidden-mobile">
                <SummaryView t={t} data={dataCart} {...other} />
            </div>
        </div>
    );
};

export default Content;
