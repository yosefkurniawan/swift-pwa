/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import React, { useState } from 'react';
import _ from 'lodash';
import {
    createCustomerAddress, updateCustomerAddress, updatedDefaultAddress as gqlUpdateDefaulAddress,
} from '../../../../services/graphql';

const ModalAddressCustomer = (props) => {
    const {
        Content, checkout, setOpen, openNew, setCheckout, setOpenNew, setAddress, ...other
    } = props;
    // graphql
    const { customer } = checkout.data;
    const [updatedDefaultAddress] = gqlUpdateDefaulAddress();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    // state
    const [address, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success] = useState(false);

    React.useEffect(() => {
        if (customer) {
            const selectedAddress = customer.addresses.find((addr) => addr.default_shipping);
            setSelectedAddressId(selectedAddress ? selectedAddress.id : null);
            setAddresses(customer.addresses);
        }
    }, [customer]);

    // handle open modal add adress button
    const handleOpenNew = () => {
        setOpenNew(true);
    };

    // handle change selected address
    const handleChange = async (event) => {
        if (selectedAddressId !== event.target.value) {
            const addressId = parseInt(event.target.value);
            setSelectedAddressId(addressId);
            let detail = {};
            for (let index = 0; index < address.length; index++) {
                if (address[index].id === addressId) {
                    detail = address[index];
                }
            }

            await updatedDefaultAddress({
                variables: {
                    addressId,
                    street: detail.street[0],
                },
            });

            const { cart } = checkout.data;

            await setAddress(detail, cart);
            setOpen(false);
        }
    };

    // handle add address
    const handleAddress = async (data, type) => {
        let state = { ...checkout };
        state.loading.addresses = true;
        setCheckout(state);
        setLoadingAddress(true);
        if (!success) {
            if (type === 'update') {
                await updateAddress({
                    variables: {
                        ...data,
                    },
                }).then((res) => {
                    const newAddresses = customer.addresses.map((item) => {
                        if (item.id === res.data.updateCustomerAddress.id) {
                            return res.data.updateCustomerAddress;
                        }
                        return item;
                    });
                    state = { ...checkout };
                    state.data.customer.addresses = newAddresses;
                    setCheckout(state);
                });
            } else {
                await addAddress({
                    variables: {
                        ...data,
                    },
                });
            }
        }

        setLoadingAddress(false);

        _.delay(() => {
            if (openNew) {
                setOpenNew(false);
            }
            state = { ...checkout };
            state.loading.addresses = false;
            setCheckout(state);
        }, 750);
    };
    return (
        <Content
            loading={checkout.loading.addresses}
            address={address}
            selectedAddressId={selectedAddressId}
            handleChange={handleChange}
            handleOpenNew={handleOpenNew}
            handleAddress={handleAddress}
            loadingAddress={loadingAddress}
            success={success}
            openNew={openNew}
            setOpen={setOpen}
            {...other}
        />
    );
};

export default ModalAddressCustomer;
