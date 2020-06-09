/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
} from '@material-ui/core';
import Typography from '@components/Typography';
import Alert from '@material-ui/lab/Alert';
import { GraphCustomer } from '@services/graphql';
import Link from 'next/link';
import formatDate from '@helpers/date';
import urlParser from '@helpers/urlParser';
import useStyles from '../style';
import Loader from './skeleton';

export default (props) => {
    const { t } = props;
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
    const { data, loading, error } = GraphCustomer.getRewardPoint({
        pageSize: rowsPerPage,
        currentPage: page + 1,
    });

    let customerRewardPoints = {
        balance: 0,
        balanceCurrency: 0,
        formatedBalanceCurrency: '$0.00',
        formatedSpendRate: '$0.00',
        spendRate: 1,
        transaction_history: {
            items: [],
            page_info: {
                current_page: 1,
                page_size: 10,
                total_pages: 0,
            },
            total_count: 0,
        },
    };

    if (error) {
        return (
            <div className={styles.account_point}>
                <Alert className="m-15" severity="error">
                    {error.message.split(':')[1]}
                </Alert>
            </div>
        );
    }
    if (loading || !data) return <Loader />;
    if (data && data.customerRewardPoints) customerRewardPoints = data.customerRewardPoints;
    const getId = (string) => string.split('#')[1].split('</a')[0];
    const getPath = (string) => {
        const path = urlParser(string, 'href').pathArray;
        const id = getId(string);
        let url = '';
        for (let index = 1; index < path.length - 2; index += 1) {
            url += `/${path[index]}`;
        }
        return `${url}/${id}`;
    };
    return (
        <div className={styles.container}>
            <List>
                <ListItem>
                    <ListItemText primary={<Typography variant="p">{t('customer:rewardPoint:balanceTitle')}</Typography>} />
                    <ListItemSecondaryAction>
                        <Typography variant="span" type="bold">
                            {customerRewardPoints.balance || 0}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText primary={<Typography variant="p">{t('customer:rewardPoint:canbeTitle')}</Typography>} />
                    <ListItemSecondaryAction>
                        <Typography variant="span" type="bold">
                            {customerRewardPoints.formatedBalanceCurrency || ''}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText primary={<Typography variant="p">{t('customer:rewardPoint:learnMore').split('$')[0]}</Typography>} />
                    <ListItemSecondaryAction>
                        <Link href="/[...slug]" as="/aw-reward-points">
                            <a>
                                <Typography variant="span" type="bold">
                                    {t('customer:rewardPoint:learnMore').split('$')[1]}
                                </Typography>
                            </a>
                        </Link>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <div className={styles.tableOuterContainer}>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table} aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="left">{t('customer:rewardPoint:transactionId')}</TableCell>
                                <TableCell align="left">{t('customer:rewardPoint:balance')}</TableCell>
                                <TableCell align="left">{t('customer:rewardPoint:comment')}</TableCell>
                                <TableCell align="left">{t('customer:rewardPoint:expired')}</TableCell>
                                <TableCell align="left">{t('customer:rewardPoint:point')}</TableCell>
                                <TableCell align="left">{t('customer:rewardPoint:transactionDate')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && customerRewardPoints.transaction_history.items.length > 0 ? (
                                <>
                                    {customerRewardPoints.transaction_history.items.map((val, idx) => (
                                        <TableRow key={idx} className={styles.tableRowResponsive}>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('customer:rewardPoint:transactionId')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('customer:rewardPoint:transactionId')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>{val.transactionId}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('customer:rewardPoint:balance')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('customer:rewardPoint:balance')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>{val.balance}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('customer:rewardPoint:comment')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('customer:rewardPoint:comment')}
                                                        </Typography>
                                                    </div>
                                                    {
                                                        (val.comment.split('<a').length > 1 && val.comment.includes('/sales/order/view/order_id'))
                                                            ? (
                                                                <div
                                                                    className={styles.value}
                                                                    // eslint-disable-next-line react/no-danger
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: `${val.comment.split('<a')[0]} 
                                                                            <a href="${getPath(val.comment)}">#${getId(val.comment)}</a>
                                                                            `,
                                                                    }}
                                                                />
                                                            )
                                                            // eslint-disable-next-line react/no-danger
                                                            : (<div className={styles.value} dangerouslySetInnerHTML={{ __html: val.comment }} />)
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('customer:rewardPoint:expired')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('customer:rewardPoint:expired')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>{val.expirationDate ? formatDate(val.expirationDate) : '-'}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('customer:rewardPoint:point')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('customer:rewardPoint:point')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <div className={val.points < 0 ? styles.textRed : styles.textGreen}>
                                                            {val.points < 0 ? `${val.points}` : `+${val.points}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('customer:rewardPoint:transactionDate')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('customer:rewardPoint:transactionDate')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>{val.transactionDate ? formatDate(val.transactionDate) : '-'}</div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                            colSpan={6}
                                            count={customerRewardPoints.transaction_history.total_count || 0}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            labelRowsPerPage="Limit"
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
                                    <TableCell colSpan={6}>
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
