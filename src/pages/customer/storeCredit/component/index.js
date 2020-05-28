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
import Link from 'next/link';
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
                        ? formatPrice(storeCredit.current_balance.value, storeCredit.current_balance.currency) : ''}
                </b>
            </p>

            <div className={styles.tableContainer}>
                <TableContainer component={Paper}>
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
                            {loading ? <SkeletonStoreCredit />
                                : storeCredit.transaction_history.items.length > 0 ? (
                                    <>
                                        {storeCredit.transaction_history.items.map((val, idx) => (
                                            <TableRow key={idx} className={styles.tableRowResponsive}>
                                                <TableCell
                                                    align="left"
                                                    data-th={t('customer:storeCredit:transactionId')}
                                                >
                                                    <table>
                                                        <tr>
                                                            <td className={styles.cellChildLeft}>
                                                                <b>
                                                                    {t('customer:storeCredit:transactionId')}
                                                                </b>
                                                            </td>
                                                            <td className={styles.cellChildMiddle}>:</td>
                                                            <td>
                                                                {val.transaction_id}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    data-th={t('customer:storeCredit:adjustment')}
                                                >
                                                    <table>
                                                        <tr>
                                                            <td className={styles.cellChildLeft}>
                                                                <b>
                                                                    {t('customer:storeCredit:adjustment')}
                                                                </b>
                                                            </td>
                                                            <td className={styles.cellChildMiddle}>:</td>
                                                            <td>
                                                                <div className={val.store_credit_adjustment.value < 0
                                                                    ? styles.textRed : styles.textGreen}
                                                                >
                                                                    {
                                                                        formatPrice(val.store_credit_adjustment.value,
                                                                            val.store_credit_adjustment.currency)
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    data-th={t('customer:storeCredit:creditbalance')}
                                                >
                                                    <table>
                                                        <tr>
                                                            <td className={styles.cellChildLeft}>
                                                                <b>
                                                                    {t('customer:storeCredit:creditbalance')}
                                                                </b>
                                                            </td>
                                                            <td className={styles.cellChildMiddle}>:</td>
                                                            <td>
                                                                {formatPrice(val.store_credit_balance.value, val.store_credit_balance.currency)}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    data-th={t('customer:storeCredit:comment')}
                                                >
                                                    <table>
                                                        <tr>
                                                            <td className={styles.cellChildLeft}>
                                                                <b>
                                                                    {t('customer:storeCredit:comment')}
                                                                </b>
                                                            </td>
                                                            <td className={styles.cellChildMiddle}>:</td>
                                                            <td>
                                                                {val.comment}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    data-th={t('customer:storeCredit:transactionDate')}
                                                >
                                                    <table>
                                                        <tr>
                                                            <td className={styles.cellChildLeft}>
                                                                <b>
                                                                    {t('customer:storeCredit:transactionDate')}
                                                                </b>
                                                            </td>
                                                            <td className={styles.cellChildMiddle}>:</td>
                                                            <td>
                                                                {formatDate(val.transaction_date_time)}
                                                            </td>
                                                        </tr>
                                                    </table>

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
            <Link href="/customer/setting">
                <a className={styles.editLink}>{t('customer:storeCredit:editEmail')}</a>
            </Link>
        </div>
    );
};

export default StoreCreditPage;
