import Button from '@components/Button';
import Typography from '@components/Typography';
import useStyles from './style';

const ButtonField = ({ placeholder = '', onClick }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Button variant="text" capitalize onClick={onClick} className={styles.searchButton}>
                <Typography
                    variant="span"
                    type="semiBold"
                    className={styles.placeholder}
                >
                    {placeholder}
                </Typography>
            </Button>
        </div>
    );
};

export default ButtonField;
