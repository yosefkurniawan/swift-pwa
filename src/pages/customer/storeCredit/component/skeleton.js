import Skeleton from '@material-ui/lab/Skeleton';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const SkeletonStoreCredit = () => (
    <>
        <TableRow>
            <TableCell colSpan={5}>
                <Skeleton variant="rect" width="100%" height={20} />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={5}>
                <Skeleton variant="rect" width="100%" height={20} />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={5}>
                <Skeleton variant="rect" width="100%" height={20} />
            </TableCell>
        </TableRow>
    </>
);

export default SkeletonStoreCredit;
