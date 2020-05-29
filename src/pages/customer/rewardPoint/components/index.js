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
} from '@material-ui/core';
import Typography from '@components/Typography';
import Alert from '@material-ui/lab/Alert';
import { GraphCustomer } from '@services/graphql';
import Link from 'next/link';
import formatDate from '@helpers/date';
import useStyles from '../style';
import Loader from './skeleton';

export default (props) => {
    const { t } = props;
    const styles = useStyles();
    const { data, loading, error } = GraphCustomer.getRewardPoint();
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
    return (
        <div className={styles.container}>
            <List>
                <ListItem>
                    <ListItemText primary={<Typography variant="p">{t('customer:rewardPoint:balanceTitle')}</Typography>} />
                    <ListItemSecondaryAction>
                        <Typography variant="span" type="bold">
                            {data.customerRewardPoints.balance || 0}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText primary={<Typography variant="p">{t('customer:rewardPoint:canbeTitle')}</Typography>} />
                    <ListItemSecondaryAction>
                        <Typography variant="span" type="bold">
                            {data.customerRewardPoints.formatedBalanceCurrency || ''}
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
                            {loading ? (
                                <Loader />
                            ) : data.customerRewardPoints.transaction.length > 0 ? (
                                <>
                                    {data.customerRewardPoints.transaction.map((val, idx) => (
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
                                                    <div className={styles.value}>
                                                        {val.transactionId}
                                                    </div>
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
                                                    <div className={styles.value}>
                                                        {val.balance}
                                                    </div>
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
                                                    <div className={styles.value}>
                                                        {val.comment}
                                                    </div>
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
                                                    <div className={styles.value}>
                                                        {val.expirationDate ? formatDate(val.expirationDate) : '-'}
                                                    </div>
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
                                                    <div className={val.points < 0 ? styles.textRed : styles.textGreen}>
                                                        {val.points < 0 ? `-${val.points}` : `+${val.points}`}
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
                                                    <div className={styles.value}>
                                                        {val.transactionDate ? formatDate(val.transactionDate) : '-'}
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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
