import { Skeleton } from '@material-ui/lab';
import useStyles from './style';

const SkeleteonTracking = () => {
    const styles = useStyles();
    return (
        <table style={{ width: '100%' }}>
            <tbody>
                <tr>
                    <td className={styles.tColContent} style={{ width: '50%' }}><Skeleton variant="text" /></td>
                    <td className={styles.tColContent} style={{ width: '2%' }}>:</td>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                </tr>
                <tr>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                    <td className={styles.tColContent}>:</td>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                </tr>
                <tr>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                    <td className={styles.tColContent}>:</td>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                </tr>
                <tr>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                    <td className={styles.tColContent}>:</td>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                </tr>
                <tr>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                    <td className={styles.tColContent}>:</td>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                </tr>
                <tr>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                    <td className={styles.tColContent}>:</td>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                </tr>
                <tr>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                    <td className={styles.tColContent}>:</td>
                    <td className={styles.tColContent}><Skeleton variant="text" /></td>
                </tr>
            </tbody>
        </table>
    );
};

export default SkeleteonTracking;
