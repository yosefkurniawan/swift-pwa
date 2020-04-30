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
        region = '',
        city = '',
        district = '',
        phoneNumber = '',
        value = '',
        checked = false,
        onSubmitAddress,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const [open, setOpen] = React.useState(false);
    const styles = useStyles();
    return (
        <>
            <AddDialog
                {...props}
                isSelectedValue={true}
                open={open}
                onSubmitAddress={() => {
                    onSubmitAddress();
                    _.delay(() => {
                        setOpen(!open);
                    }, 1500);
                }}
                setOpen={() => setOpen(!open)}
                pageTitle={'editTitle'}
            />
            <Box className="column">
                <Box className={[styles.address_content].join(' ')}>
                    <FormControlLabel
                        className={[styles.address_shipping].join(' ')}
                        value={value}
                        checked={checked}
                        control={<Radio color="primary" size="small" />}
                        label={
                            <>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {firstName} {lastName}
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {street},
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {district !== '' && `${district}, `}
                                    {city !== '' && `${city}, `}
                                    {region !== '' && `${region}, `}
                                    {country !== '' && `${country}, `}
                                    {posCode !== '' && posCode}
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {phoneNumber}
                                </Typography>
                            </>
                        }
                        labelPlacement="end"
                    />
                    <Typography className={[styles.address_edit].join(' ')} variant="span" onClick={() => setOpen(!open)}>
                        Edit Address
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default ItemAddress;
