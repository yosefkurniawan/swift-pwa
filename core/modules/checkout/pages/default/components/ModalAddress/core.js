/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import React, { useState } from 'react';
import gqlService, {
    createCustomerAddress,
    updateCustomerAddress,
    updatedDefaultAddress as gqlUpdateDefaulAddress,
} from '../../../../services/graphql';

const ModalAddressCustomer = (props) => {
    const {
        Content, checkout, setOpen, setCheckout, setAddress, open, manageCustomer, ...other
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
    const [openNew, setOpenNew] = useState(false);
    const [typeAddress, setTypeAddress] = useState('new');
    const [dataEdit, setDataEdit] = useState({});
    const [getAddress, { loading, data: addressCustomer }] = gqlService.getAddressCustomer();
    React.useEffect(() => {
        if (open) {
            getAddress();
            const newCheckout = { ...checkout };
            if (addressCustomer && !loading) {
                manageCustomer.data.customer.addresses = addressCustomer.customer.addresses;
                newCheckout.data.customer = manageCustomer.data.customer;
                setCheckout(newCheckout);
            }
        }
    }, [open]);
    React.useEffect(() => {
        const newCustomer = checkout.data.customer;
        if (customer) {
            const selectedAddress = newCustomer.addresses.find((addr) => addr.default_shipping);
            setSelectedAddressId(selectedAddress ? selectedAddress.id : null);
            setAddresses(newCustomer.addresses);
        }
    }, [customer]);

    // handle open modal add adress button
    const handleOpenNew = (type = 'new') => {
        setOpen(!open);
        setOpenNew(!openNew);
        setTypeAddress(type);
    };

    // handle change selected address
    const handleChange = async (event) => {
        if (selectedAddressId !== event.target.value) {
            setOpen(false);
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
        }
    };

    // handle add address
    const handleAddress = async (data) => {
        setLoadingAddress(true);
        if (!success) {
            if (typeAddress === 'update') {
                await updateAddress({
                    variables: {
                        ...data,
                    },
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

        if (openNew && !open) {
            setOpenNew(false);
            setOpen(true);
            manageCustomer.refetch();
        }
    };
    if (loading) {
        return null;
    }
    return (
        <Content
            loading={loading}
            addressCustomer={addressCustomer}
            address={address}
            selectedAddressId={selectedAddressId}
            handleChange={handleChange}
            handleOpenNew={handleOpenNew}
            handleAddress={handleAddress}
            loadingAddress={loadingAddress}
            success={success}
            openNew={openNew}
            setOpen={setOpen}
            open={open}
            typeAddress={typeAddress}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
            manageCustomer={manageCustomer}
            updateAddress={updateAddress}
            {...other}
        />
    );
};

export default ModalAddressCustomer;
