import TextField from '@components/Forms/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@Button';
import Typography from '@Typography';

const FieldPoint = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    action,
    disabled = false,
    id = null,
    name = null,
    error,
    errorMessage = 'error',
    loading = false,
    toggleField = false,
    styles,
}) => (
    <div className={styles.fieldPoinContainer}>
        <TextField
            id={id}
            name={name}
            disabled={!!(disabled || toggleField)}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            error={error}
            errorMessage={error ? errorMessage : null}
        />
        <div>
            <Button variant="outlined" className={styles.btnAplly} onClick={action} disabled={disabled || loading || value === ''}>
                <Typography variant="p" color={loading || disabled || value === '' ? 'gray' : 'default'} type="bold" letter="uppercase">
                    {toggleField ? 'Remove' : 'Apply'}
                </Typography>
                {loading && <CircularProgress className={styles.smallCircular} size={16} />}
            </Button>
        </div>
    </div>
);

export default FieldPoint;
