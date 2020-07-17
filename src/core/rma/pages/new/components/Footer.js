import Button from '@components/Button';
import Typography from '@components/Typography';
import useStyles from './styles';

export default ({ t, data: { detail } }) => {
    const styles = useStyles();
    return (
        <div className={styles.footer}>
            <Button fullWidth variant="outlined">
                <Typography variant="span">{t('order:reorder')}</Typography>
            </Button>
            {
                (detail[0].status_label === 'complete' || detail[0].status_label.toLowerCase() === 'complete')
                    && (
                        <Button fullWidth variant="outlined">
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
