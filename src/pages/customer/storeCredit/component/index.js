import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Link from 'next/link';
import useStyles from '../style';
import SkeletonStoreCredit from './skeleton';

const StoreCreditPage = ({ t }) => {
    const styles = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const loading = true;
    return (
        <div className={styles.container}>
            <p className={styles.textBalance}>
                {t('customer:storeCredit:balance')}
                {' '}
                <b>{loading ? '0' : 'Rp. 10.000' }</b>
            </p>

            <div className={styles.tableContainer}>
                <TableContainer component={Paper}>
                    <Table className={styles.table} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{t('customer:storeCredit:transactionId')}</TableCell>
                                <TableCell align="left">{t('customer:storeCredit:adjustment')}</TableCell>
                                <TableCell align="left">{t('customer:storeCredit:creditbalance')}</TableCell>
                                <TableCell align="left">{t('customer:storeCredit:comment')}</TableCell>
                                <TableCell align="left">{t('customer:storeCredit:transactionDate')}</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {loading ? <SkeletonStoreCredit /> : (
                                <>
                                    <TableRow>
                                        <TableCell align="left">1</TableCell>
                                        <TableCell align="left"><span>+$50.00</span></TableCell>
                                        <TableCell align="left">$150.00</TableCell>
                                        <TableCell align="left">topup balance</TableCell>
                                        <TableCell align="left">May 5, 2020</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={5}
                                            count={20}
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
