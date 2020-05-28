import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@components/Typography';
import useStyles from '../style';

const ItemOrder = ({ data }) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableBody>
                        {Object.keys(data).map((item, index) => {
                            if (item !== '__typename') {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="half-width" component="th" scope="row">
                                            <Typography type="bold" letter="capitalize">
                                                {item.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">{data[item]}</TableCell>
                                    </TableRow>
                                );
                            }
                            return null;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ItemOrder;
