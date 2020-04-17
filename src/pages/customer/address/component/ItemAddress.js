import { FormControlLabel, Box, Radio } from '@material-ui/core';
import Typography from '@components/Typography';
import useStyles from './style';
import AddDialog from './AddDialog';

const ItemAddress = (props) => {
    const {
        firstName = '',
        lastName = '',
        street = '',
        posCode = '',
        country = '',
        state = '',
        city = '',
        district = '',
        phoneNumber = '',
        value = '',
        // eslint-disable-next-line no-unused-vars
        openEdit = () => {},
    } = props;
    const [open, setOpen] = React.useState(false);
    const styles = useStyles();
    return (
        <>
            <AddDialog {...props} open={open} setOpen={() => setOpen(!open)} />
            <FormControlLabel
                className={[styles.address_shipping].join(' ')}
                value={value}
                control={<Radio color="primary" size="small" />}
                label={(
                    <Box className="column">
                        <Box className={[styles.address_content].join(' ')}>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                variant="p"
                            >
                                {firstName}
                                {' '}
                                {lastName}
                            </Typography>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                variant="p"
                            >
                                {street}
                                ,
                            </Typography>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                variant="p"
                            >
                                {district !== '' && `${district}, `}
                                {city !== '' && `${city}, `}
                                {state !== '' && `${state}, `}
                                {country !== '' && `${country}, `}
                                {posCode !== '' && posCode}
                            </Typography>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                variant="p"
                            >
                                {phoneNumber}
                            </Typography>
                        </Box>
                        <Typography
                            className={[styles.address_edit].join(' ')}
                            variant="span"
                            onClick={() => setOpen(!open)}
                        >
                            Edit Address
                        </Typography>
                    </Box>
                )}
                labelPlacement="end"
            />
        </>
    );
};

export default ItemAddress;
