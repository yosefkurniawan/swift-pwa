import GridList from '@common_gridlist';
import Pagination from '@material-ui/lab/Pagination';
import LabelView from '@plugin_productitem/components/LabelView';
import ProductItem from '@plugin_productitem/index';
import useStyles from '@plugin_productlist/components/style';

const PaginationSection = (props) => {
    const {
        products, categoryPath, ProductListSkeleton, loading,
        loadmore, page, totalPage, handleChangePage, price, loadPrice, isGrid, storeConfig, ...other
    } = props;
    const styles = useStyles();

    return (
        <>
            {loading && <ProductListSkeleton />}
            {!loadmore && !loading && (
                <GridList
                    data={products.items}
                    ItemComponent={ProductItem}
                    itemProps={{
                        categorySelect: categoryPath,
                        LabelView,
                        isGrid,
                        catalogList: true,
                        className: 'grid-item',
                        price,
                        loadPrice,
                        ...other,
                    }}
                    gridItemProps={
                        isGrid
                            ? {
                                xs: 6, sm: 4, md: storeConfig?.pwa?.drawer_filter_on_desktop_enable ? 3 : 2,
                            } : {
                                xs: 12, sm: 12, md: storeConfig?.pwa?.drawer_filter_on_desktop_enable ? 12 : 12,
                            }
                    }
                />
            )}
            {totalPage && totalPage > 0 ? (
                <div className={styles.loadmorePagination}>
                    <Pagination
                        count={totalPage}
                        page={page}
                        onChange={(e, p) => handleChangePage(p)}
                        showFirstButton
                        showLastButton
                        siblingCount={1}
                        boundaryCount={1}
                    />
                </div>
            ) : null}
        </>
    );
};

export default PaginationSection;
