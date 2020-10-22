import React, { useState, useEffect } from 'react';
import gqlService from '../../../../services/graphql';

const Email = (props) => {
    const {
        checkout,
        EmailView,
        formik,
        setCheckout,
        handleOpenMessage,
        t,
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [saved, setSaved] = useState(false);
    const [setGuestEmailAddressOnCart] = gqlService.setGuestEmailAddressOnCart(({ onError: () => {} }));
    const open = Boolean(anchorEl);
    const id = open ? 'email-helper' : undefined;
    const handleSave = async () => {
        const state = { ...checkout };
        window.backdropLoader(true);
        const result = await setGuestEmailAddressOnCart({ variables: { cartId: checkout.data.cart.id, email: formik.values.email } });
        if (!result || result.errors) {
            handleOpenMessage({
                variant: 'error',
                text: t('checkout:message:problemConnection'),
            });
        } else {
            await formik.setFieldValue('oldEmail', formik.values.email);
            state.data.cart = {
                ...state.data.cart,
                ...result.data.setGuestEmailOnCart.cart,
            };
            setCheckout(state);
            setSaved(true);
            window.backdropLoader(false);
        }
    };

    const handleBlur = async () => {
        if (formik.values.oldEmail !== '' && formik.values.email !== formik.values.oldEmail) {
            setSaved(false);
        } else if (formik.values.oldEmail !== '') {
            setSaved(true);
        }
    };

    useEffect(() => {
        if (!saved && formik.values.email && formik.values.email !== '') {
            setSaved(true);
        }
    }, [formik.values.email]);

    const content = (
        <EmailView
            {...props}
            idButton={id}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleSave={handleSave}
            saved={saved}
            handleBlur={handleBlur}
        />
    );

    return checkout.data.isGuest ? content : null;
};

export default Email;
