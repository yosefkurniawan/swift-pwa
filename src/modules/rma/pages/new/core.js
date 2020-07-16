/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import DefaultLayout from '@components/Layouts';
import { useRouter } from 'next/router';
import { getFormDataRma, requestRma } from '../../services/graphql';

const CoreNewRma = (props) => {
    const {
        t, Loader, WarningInfo, Content, pageConfig = {},
        storeConfig, customerData, ...other
    } = props;
    const config = {
        title: t('rma:history'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('rma:history'),
        bottomNav: false,
        ...pageConfig,
    };

    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = React.useState({
        order_number: id,
        customer_name: customerData.firstname,
        customer_email: customerData.email,
        custom_fields: [],
        order_items: [],
        message: '',
        attachments: [],
    });
    const [selectItem, setSelectItem] = React.useState([]);
    const [state, setState] = React.useState({
        loading: false,
        openMessage: false,
        textMessage: '',
        variantMessage: 'success',
        errorForm: false,
    });

    const [postRma] = requestRma();

    const { loading, data, error } = getFormDataRma({
        email: customerData.email,
        order_number: id,
    });

    let objectData = {
        custom_fields: [],
        items: [],
        allowed_file_extensions: [],
    };

    if (loading || !data) {
        return <Loader />;
    }
    if (error) {
        return (
            <DefaultLayout {...props} pageConfig={config}>
                <WarningInfo variant="error" text={t('rma:error:fetch')} />
            </DefaultLayout>
        );
    }

    if (data) {
        objectData = data.getNewFormDataAwRma;
    }

    let products = [];
    const currency = storeConfig ? storeConfig.base_currency_code : 'IDR';

    const handleSelectProduct = (val) => {
        setSelectItem(val);
    };

    const selectAll = () => {
        const selected = [];
        objectData.items.map(({ item_id, is_returnable }) => is_returnable && selected.push(item_id));
        setSelectItem(selected);
    };

    const deselectAll = () => setSelectItem([]);
    if (objectData.items.length > 0) {
        const itemsChild = objectData.items.filter((item) => {
            if (item.parent_item_id !== null) {
                return item;
            }
        });
        const simpleData = objectData.items.filter((item) => !itemsChild.find(({ sku }) => item.sku === sku) && item);
        products = [...itemsChild, ...simpleData];
        products = products.map((product) => ({
            label: product.name,
            value: product.item_id,
            form: objectData.custom_fields,
            disabled: !product.is_returnable,
            currency,
            formData,
            setFormData,
            errorForm: state.errorForm,
            ...product,
        }));
    }

    const changeOptionCustomField = (value) => {
        let allField = formData.custom_fields;
        const findField = formData.custom_fields.find((item) => value.field_id === item.field_id);
        if (findField) {
            allField = formData.custom_fields.filter((item) => item.field_id !== value.field_id);
            allField.push(value);
        } else {
            allField.push(value);
        }
        setFormData({
            ...formData,
            custom_fields: allField,
        });
    };

    const handleGetBase64 = (files) => {
        const attachments = files.map((file) => ({
            file_content_base64: file.baseCode,
            file_name: file.file.name,
            name: file.file.name,
        }));
        setFormData({
            ...formData,
            attachments,
        });
    };

    const handleSubmit = () => {
        const fieldRequets = objectData.custom_fields.filter((field) => field.refers === 'request');
        const fieldItem = objectData.custom_fields.filter((field) => field.refers === 'item');
        const stateData = state;
        stateData.errorForm = false;
        if (formData.custom_fields.length < fieldRequets.length) stateData.errorForm = true;
        if (selectItem.length > 0) {
            formData.order_items.map((item) => {
                if (item.custom_fields.length < fieldItem.length) stateData.errorForm = true;
            });
        } else {
            stateData.errorForm = true;
            stateData.textMessage = t('return:form:itemNull');
            stateData.openMessage = true;
            stateData.variantMessage = 'error';
        }

        if (stateData.errorForm === false) {
            window.backdropLoader(true);
            postRma({
                variables: {
                    order_number: formData.order_number,
                    customer_name: formData.customer_name,
                    customer_email: formData.customer_email,
                    custom_fields: formData.custom_fields,
                    order_items: formData.order_items,
                    thread_message: {
                        text: formData.message,
                        attachments: formData.attachments,
                    },
                },
            }).then(async (res) => {
                if (res.data) {
                    window.backdropLoader(false);
                    await window.toastMessage({
                        open: true,
                        text: t('return:form:addSuccess'),
                        variant: 'success',
                    });
                    setTimeout(() => {
                        router.push(
                            '/rma/customer/view/id/[id]',
                            `/rma/customer/view/id/${res.data.createRequestAwRma.detail_rma.increment_id}`,
                        );
                    }, 1500);
                }
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('return:form:addFailed'),
                    variant: 'error',
                });
            });
        } else {
            setState({ ...stateData });
        }
    };

    let fileAccept = '';
    if (objectData.allowed_file_extensions.length > 0) {
        objectData.allowed_file_extensions.map((ext) => {
            fileAccept += `.${ext},`;
        });
    }

    const contentprops = {
        t,
        loading,
        data: objectData,
        products,
        fileAccept,
        handleSubmit,
        formData,
        setFormData,
        handleGetBase64,
        handleSelectProduct,
        selectAll,
        deselectAll,
        changeOptionCustomField,
        state,
        setState,
    };

    return (
        <DefaultLayout {...props} pageConfig={config}>
            <Content
                {...contentprops}
                {...other}
            />
        </DefaultLayout>
    );
};

CoreNewRma.propTypes = {
    Content: propTypes.func.isRequired,
    ItemProduct: propTypes.func.isRequired,
    ItemField: propTypes.func.isRequired,
    Loader: propTypes.func,
    WarningInfo: propTypes.func,
    pageConfig: propTypes.object,
};

CoreNewRma.defaultProps = {
    Loader: () => {},
    WarningInfo: () => {},
    pageConfig: {},
};

export default CoreNewRma;
