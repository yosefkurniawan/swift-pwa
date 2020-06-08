import Button from '@components/Button';
import Typography from '@components/Typography';
import Router from 'next/router';
import useStyles from '../style';

export default ({ t, detail }) => {
    const styles = useStyles();
    return (
        <div className={styles.footer}>
            <Button fullWidth variant="outlined">
                <Typography variant="span">{t('order:reorder')}</Typography>
            </Button>
            {
                (detail[0].status_label === 'complete' || detail[0].status_label.toLowerCase() === 'complete')
                    && (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => Router.push(
                                '/rma/customer/new/order_id/[id]',
                                `/rma/customer/new/order_id/${detail[0].order_number}`,
                            )}
                        >
                            <Typography variant="span">{t('order:return')}</Typography>
                        </Button>
                    )
            }
            <Button fullWidth variant="outlined">
                <Typography variant="span">{t('order:print')}</Typography>
            </Button>
        </div>
    );
};
