/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Typography from '@common_typography';

import useStyles from '@core_modules/thanks/pages/default/components/style';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconArrow from '@material-ui/icons/ArrowForwardIos';
import { GRAY_PRIMARY } from '@theme_color';
import classNames from 'classnames';
import Link from 'next/link';
import propTypes from 'prop-types';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: GRAY_PRIMARY,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const ViewThanksMultiSeller = (props) => {
    const {
        t,
        isLogin,
        handleContinue,
        customerOrder,
    } = props;

    const styles = useStyles();

    return (
        <div className={classNames(styles.container, 'thanks-pages')}>
            <div className={styles.info}>
                <Typography variant="h1" type="bold" letter="uppercase" className={styles.title}>
                    {t('thanks:thanks')}
                </Typography>
                <Typography variant="span" className="clear-margin-padding" letter="none">
                    {t('thanks:placeInfo')}
                </Typography>
            </div>
            <TableContainer component={Paper} className={styles.table}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{`${t('thanks:seller')}`}</StyledTableCell>
                            <StyledTableCell align="right">Order ID</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerOrder
                            && customerOrder.length > 0
                            && customerOrder.map((item, key) => (
                                <TableRow key={key}>
                                    <StyledTableCell component="th" scope="row">
                                        {item.seller_name && `${item.seller_name}`}
                                        {item.seller_city && ` - ${item.seller_city}`}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {isLogin && isLogin === 1 ? (
                                            <Link href={`/sales/order/view/order_id/${item?.order_number}`} passhref>
                                                <a>
                                                    <b>{`#${item?.order_number}`}</b>
                                                </a>
                                            </Link>
                                        ) : (
                                            <b>{`#${item?.order_number}`}</b>
                                        )}
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link href="/sales/order/history" passHref>
                <Typography size="10" type="bold" color="primary" letter="uppercase" className={styles.txtConfirmMultiseller}>
                    {t('thanks:orderInfo')}
                </Typography>
            </Link>
            <Button onClick={handleContinue} className={styles.btnConfirmMultiseller} endIcon={<IconArrow className={styles.btnConfirmIcon} />}>
                <Typography size="10" type="bold" color="white" letter="uppercase" className={styles.txtConfirm}>
                    {t('thanks:continue')}
                </Typography>
            </Button>
        </div>
    );
};

ViewThanksMultiSeller.propTypes = {
    storeConfig: propTypes.object.isRequired,
    checkoutData: propTypes.object.isRequired,
    t: propTypes.func.isRequired,
    customerOrder: propTypes.array.isRequired,
};

export default ViewThanksMultiSeller;
