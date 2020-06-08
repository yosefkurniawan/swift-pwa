import Button from '@components/Button';
import Typography from '@components/Typography';
import Router from 'next/router';
import useStyles from '../style';

export default ({ t, detail }) => {
    const styles = useStyles();
    return (
        <div className={styles.footer}>
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
        </div>
    );
};
