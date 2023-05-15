/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Badge from '@material-ui/core/Badge';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Link from 'next/link';

const useStyles = makeStyles({
    root: {
        margin: 5,
        cursor: 'pointer',
    },
});

const WithLink = ({ compareList, handleLink }) => {
    const styles = useStyles();
    if (compareList && compareList.compareList && compareList.compareList.item_count) {
        return (
            <Link href={handleLink} prefetch={false}>
                <a className={styles.root}>
                    {compareList ? (
                        <Badge color="secondary" badgeContent={compareList.compareList.item_count > 0 ? compareList.compareList.item_count : 0}>
                            <CompareArrowsIcon color="secondary" />
                        </Badge>
                    ) : (
                        <Badge color="secondary" badgeContent={0}>
                            <CompareArrowsIcon color="secondary" />
                        </Badge>
                    )}
                </a>
            </Link>
        );
    }
    return (
        <Link href={handleLink} prefetch={false}>
            <a className={styles.root}>
                <Badge color="secondary" badgeContent={0}>
                    <CompareArrowsIcon color="secondary" />
                </Badge>
            </a>
        </Link>
    );
};

export default WithLink;
