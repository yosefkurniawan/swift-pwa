import Skeleton from '@material-ui/lab/Skeleton';
import {
    TableCell, TableRow, TableContainer, TableBody,
} from '@material-ui/core';

const SkeletonRewardPoint = () => (
    <TableContainer>
        <TableBody>
            <TableRow>
                <TableCell colSpan={6}>
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
        </TableBody>
    </TableContainer>
);

export default SkeletonRewardPoint;
