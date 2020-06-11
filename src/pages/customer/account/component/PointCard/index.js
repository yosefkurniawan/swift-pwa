import { makeStyles } from '@material-ui/core';
import { GraphCustomer } from '@services/graphql';
import Link from 'next/link';

const useStyles = makeStyles({
    account_point: {
        background: 'black',
        position: 'absolute',
        width: '60%',
        display: 'block',
        margin: 'auto',
        color: 'white',
        left: '20%',
        right: '20%',
        top: '-10%',
    },
    account_point_title: {
        marginBottom: 0,
    },
    account_point_summary: {
        marginTop: 0,
    },
});

export default ({ t }) => {
    const styles = useStyles();
    const { data, loading, error } = GraphCustomer.getRewardPoint({
        pageSize: 1,
        currentPage: 1,
    });
    if (error) {
        return (
            <div className={styles.account_point}>
                <p className={styles.account_point_title}>{t('customer:menu:myPoint')}</p>
                <h3 className={styles.account_point_summary}>{0}</h3>
            </div>
        );
    }
    return (
        <Link href="/aw_rewardpoints/info">
            <a>
                <div className={styles.account_point}>
                    <p className={styles.account_point_title}>{t('customer:menu:myPoint')}</p>
                    <h3 className={styles.account_point_summary}>{loading || !data ? 'Loading ...' : data.customerRewardPoints.balance}</h3>
                </div>
            </a>
        </Link>
    );
};
