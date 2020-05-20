import Typography from '@components/Typography';
import {
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    Link,
    Popover,
} from '@material-ui/core';
import { Help } from '@material-ui/icons';
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
            <div style={{ margin: '5px' }}>
                <FormControl fullWidth error={!!(formik.touched.email && formik.errors.email)} style={{ marginTop: '10px', marginBottom: '20px' }}>
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
            <Typography variant="p" type="regular" decoration="underline">
                <Link href="/customer/account/login">{t('checkout:haveAccount')}</Link>
            </Typography>
        </div>
    );

    return checkout.data.isGuest ? content : null;
};

export default Email;
