import TextField from '@components/Forms/TextField';
import { CircularProgress } from '@material-ui/core';
import Button from '@components/Button';
import Typography from '@components/Typography';

const FieldPoint = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    action,
    disabled,
    id = null,
    name = null,
    error,
    errorMessage = 'error',
    loading = false,
    styles,
}) => (
    <div className={styles.fieldPoinContainer}>
        <TextField
            id={id}
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            error={error}
            errorMessage={error ? errorMessage : null}
        />
        <div>
            <Button variant="outlined" className={styles.btnAplly} onClick={action} disabled={loading}>
                <Typography variant="p" color={loading ? 'white' : 'default'} type="bold" letter="uppercase">
                    {disabled ? 'Remove' : 'Apply'}
                </Typography>
                {loading && (
                    <CircularProgress
                        style={{
                            position: 'absolute', top: '50%', left: '50%', marginTop: -6, marginLeft: -6, color: 'black',
                        }}
                        size={12}
                    />
                )}
            </Button>
        </div>
    </div>
);

export default FieldPoint;
