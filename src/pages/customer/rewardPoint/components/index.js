import {
    List, ListItem, ListItemText, ListItemSecondaryAction, Divider,
} from '@material-ui/core';
import Typography from '@components/Typography';
import Alert from '@material-ui/lab/Alert';
import { GraphCustomer } from '@services/graphql';
import Link from 'next/link';
import useStyles from '../style';
import Item from './item';

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
    if (loading || !data) return <p>Loading ...</p>;
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
            <Divider className={styles.divider} />
            {
                data.customerRewardPoints.transaction.map((item, index) => <Item data={item} key={index} />)
            }
        </div>
    );
};
