import classNames from 'classnames';
import Button from '@components/Button';
import Typography from '@components/Typography';
import useStyles from '../style';
import Item from './item';

const DefaultView = (props) => {
    const {
        data, t, handleLoadMore, loadMore, page, loading,
    } = props;
    const styles = useStyles();
    return (
        <div className={classNames(styles.container, styles.rowCenter)}>
            {data && data.items.length > 0 && data.items.map((item, index) => <Item t={t} key={index} {...item} />)}
            {data && data.total_count > data.items.length && data.total_pages > page && (
                <Button variant="text" onClick={handleLoadMore} disabled={loading || loadMore} fullWidth>
                    <Typography variant="span" type="regular" letter="capitalize">
                        {loadMore || loading ? 'Loading ...' : t('common:button:loadMore')}
                    </Typography>
                </Button>
            )}
        </div>
    );
};

export default DefaultView;
