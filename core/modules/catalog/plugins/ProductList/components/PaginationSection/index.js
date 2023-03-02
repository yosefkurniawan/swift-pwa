import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import useStyles from '@plugin_productlist/components/style';

const noRender = (prevProps, nextProps) => (
    prevProps.page === nextProps.page && prevProps.totalPage === nextProps.totalPage
);

const PaginationSection = React.memo((props) => {
    const {
        page, totalPage, handleChangePage,
    } = props;
    const styles = useStyles();

    return (
        <>
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
}, noRender);

export default PaginationSection;
