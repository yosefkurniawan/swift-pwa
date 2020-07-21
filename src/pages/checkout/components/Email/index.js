import Typography from '@components/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popover from '@material-ui/core/Popover';
import Help from '@material-ui/icons/Help';
import Button from '@Button';
import React, { useState } from 'react';

const Email = ({
    t,
    styles,
    formik,
    checkout,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'email-helper' : undefined;
    const content = (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:emailAddress')}
            </Typography>
            <div className={styles.emailContainer}>
                <FormControl fullWidth error={!!(formik.touched.email && formik.errors.email)} className={styles.customFormControl}>
                    <Input
                        name="email"
                        placeholder="john.doe@gmail.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        endAdornment={(
                            <InputAdornment position="end">
                                <IconButton
                                    aria-describedby={id}
                                    aria-label="toggle password visibility"
                                    onClick={(event) => {
                                        setAnchorEl(event.currentTarget);
                                    }}
                                >
                                    <Help />
                                </IconButton>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'right',
                                    }}
                                    onClose={() => {
                                        setAnchorEl(null);
                                    }}
                                >
                                    <Typography variant="p">{t('checkout:emailHelper')}</Typography>
                                </Popover>
                            </InputAdornment>
                        )}
                    />
                    {formik.touched.email && formik.errors.email ? <FormHelperText>{formik.errors.email || null}</FormHelperText> : null}
                </FormControl>
            </div>
            <Button variant="text" href="/customer/account/login" className="clear-margin-padding">
                <Typography variant="p" type="regular" decoration="underline" letter="capitalize">
                    {t('checkout:haveAccount')}
                </Typography>
            </Button>
        </div>
    );

    return checkout.data.isGuest ? content : null;
};

export default Email;
