import Skeleton from '@material-ui/lab/Skeleton';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const SkeletonRewardPoint = () => (
    <>
        <TableRow>
            <TableCell colSpan={6}>
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={6}>
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={6}>
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
            </TableCell>
        </TableRow>
    </>
);

export default SkeletonRewardPoint;
