/* eslint-disable no-nested-ternary */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Alert from '@material-ui/lab/Alert';
import { formatPrice } from '@helpers/currency';
import formatDate from '@helpers/date';
import useStyles from '../style';
import SkeletonStoreCredit from './skeleton';
import { getStoreCredit } from '../services';

const StoreCreditPage = ({ t }) => {
    const styles = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    let storeCredit = {
        current_balance: {
            value: 0,
            currency: 'USD',
        },
        transaction_history: {
            items: [],
        },
    };
    const { data, loading } = getStoreCredit(
        {
            pageSizeStoreCredit: rowsPerPage,
            currentPageStoreCredit: page + 1,
        },
    );
    if (data) {
        storeCredit = data.customer.store_credit;
    }
    return (
        <div className={styles.container}>
            <p className={styles.textBalance}>
                {t('customer:storeCredit:balance')}
                {' '}
                <b>
                    {storeCredit.current_balance && storeCredit.current_balance.value !== null
                        ? formatPrice(storeCredit.current_balance.value, storeCredit.current_balance.currency)
                        : ''}
                </b>
            </p>

            <div className={styles.tableOuterContainer}>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table} aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="left">{t('customer:storeCredit:transactionId')}</TableCell>
                                <TableCell align="left">{t('customer:storeCredit:adjustment')}</TableCell>
                                <TableCell align="left">{t('customer:storeCredit:creditbalance')}</TableCell>
                                <TableCell align="left">{t('customer:storeCredit:comment')}</TableCell>
                                <TableCell align="left">{t('customer:storeCredit:transactionDate')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <SkeletonStoreCredit />
                            ) : storeCredit.transaction_history.items.length > 0 ? (
                                <>
                                    {storeCredit.transaction_history.items.map((val, idx) => (
                                        <TableRow key={idx} className={styles.tableRowResponsive}>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={t('customer:storeCredit:transactionId')}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <b>{t('customer:storeCredit:transactionId')}</b>
                                                    </div>
                                                    <div className={styles.value}>{val.transaction_id}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={t('customer:storeCredit:adjustment')}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <b>{t('customer:storeCredit:adjustment')}</b>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <div className={val.store_credit_adjustment.value < 0 ? styles.textRed : styles.textGreen}>
                                                            {formatPrice(val.store_credit_adjustment.value, val.store_credit_adjustment.currency)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={t('customer:storeCredit:creditbalance')}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <b>{t('customer:storeCredit:creditbalance')}</b>
                                                    </div>
                                                    <div className={styles.value}>
                                                        {formatPrice(val.store_credit_balance.value, val.store_credit_balance.currency)}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={t('customer:storeCredit:comment')}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <b>{t('customer:storeCredit:comment')}</b>
                                                    </div>
                                                    <div className={styles.value}>{val.comment}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={t('customer:storeCredit:transactionDate')}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <b>{t('customer:storeCredit:transactionDate')}</b>
                                                    </div>
                                                    <div className={styles.value}>{formatDate(val.transaction_date_time)}</div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                            colSpan={5}
                                            count={storeCredit.transaction_history.total_count}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: { 'aria-label': 'rows per page' },
                                                native: true,
                                            }}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Alert severity="warning">{t('customer:storeCredit:emptyMessage')}</Alert>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default StoreCreditPage;
