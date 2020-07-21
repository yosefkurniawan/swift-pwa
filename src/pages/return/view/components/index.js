/* eslint-disable react/no-danger */
import classNames from 'classnames';
import Typography from '@Typography';
import React from 'react';
import formatDate from '@helpers/date';
import TextField from '@TextField';
import DropFile from '@DropFile';
import Button from '@Button';
import ConfirmModal from '@ConfirmDialog';
import useStyles from '../style';
import ItemProduct from './ItemProduct';
import ListMessage from './ListMessage';
import ItemField from './ItemField';
import { updateRma, cancelRma } from '../../services/graphql';

const DetailReturn = (props) => {
    const {
        t, data: { detail_rma, form_data }, customerData, storeConfig,
        refetch,
    } = props;
    const styles = useStyles();
    const currency = storeConfig ? storeConfig.base_currency_code : 'IDR';
    const requestFieldValue = detail_rma.custom_fields.map(({ field, value }) => ({
        field: field.id,
        value: value.id,
        valueLabel: value.frontend_labels[0].value,
    }));

    const [formData, setFormData] = React.useState({
        order_number: detail_rma.order_number,
        customer_name: customerData.firstname,
        customer_email: customerData.email,
        custom_fields: [],
        order_items: [],
        message: '',
        attachments: [],
    });

    const [state, setState] = React.useState({
        openDialog: false,
        messageDialog: '',
        handleYes: () => {},
        dropValue: [],
    });

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
    const requestFormField = form_data.custom_fields.filter((item) => item.refers === 'request');

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

    let fileAccept = '';
    if (form_data.allowed_file_extensions.length > 0) {
        // eslint-disable-next-line array-callback-return
        form_data.allowed_file_extensions.map((ext) => {
            fileAccept += `.${ext},`;
        });
    }

    const [postUpdateRma] = updateRma();
    const [postCancelRma] = cancelRma();

    const handleCancelRma = () => {
        setState({ ...state, openDialog: false });
        window.backdropLoader(true);
        postCancelRma({
            variables: {
                email: formData.customer_email,
                increment_id: detail_rma.increment_id,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('return:view:successCancel'),
            });
            refetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[1] || t('return:view:failedCancel'),
            });
        });
    };

    const handleUpdate = (update_status = false) => {
        window.backdropLoader(true);
        const variables = {
            customer_email: formData.customer_email,
            customer_name: formData.customer_name,
            increment_id: detail_rma.increment_id,
            update_status,
        };
        if (formData.custom_fields.length > 0) variables.custom_fields = formData.custom_fields;
        if (formData.message !== '') variables.thread_message = { text: formData.message, attachments: [] };
        if (formData.message !== '' && formData.attachments.length > 0) {
            variables.thread_message = { text: formData.message, attachments: formData.attachments };
        }
        postUpdateRma({
            variables: {
                ...variables,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('return:form:updateSuccess'),
            });
            setFormData({
                order_number: detail_rma.order_number,
                customer_name: customerData.firstname,
                customer_email: customerData.email,
                custom_fields: [],
                order_items: [],
                message: '',
                attachments: [],
            });
            setState({
                ...state, dropValue: [],
            });
            refetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[1] || t('return:form:updateFailed'),
            });
        });
    };

    const actionUpdateStatus = async () => {
        const handleYes = () => {
            setState({ ...state, openDialog: false });
            handleUpdate(true);
        };
        setState({
            ...state,
            openDialog: true,
            messageDialog: <div dangerouslySetInnerHTML={{ __html: t('return:view:confrimShipping') }} />,
            handleYes,
        });
    };

    const confirmCancel = () => {
        setState({
            ...state,
            openDialog: true,
            messageDialog: t('return:view:cancelRequest'),
            handleYes: handleCancelRma,
        });
    };

    let UpdateStatusButton = () => null;
    let UpdateButton = () => null;
    let CancelButton = () => null;
    const statusCancelRequired = ['Pending Approval', 'pending approval', 'Approved', 'approved'];
    const statusUpdateNoRequired = ['Closed', 'closed', 'Canceled', 'canceled'];
    if (statusCancelRequired.find((status) => status === detail_rma.status.name || status === detail_rma.status.name.toLowerCase())) {
        CancelButton = () => (
            <Button fullWidth variant="outlined" onClick={confirmCancel}>
                <Typography letter="capitalize">{t('return:view:cancelButton')}</Typography>
            </Button>
        );
    }
    if (!statusUpdateNoRequired.find((status) => status === detail_rma.status.name)
    || !statusUpdateNoRequired.find((status) => status === detail_rma.status.name.toLowerCase())) {
        UpdateButton = () => (
            <Button fullWidth variant="outlined" onClick={() => handleUpdate()}>
                <Typography letter="capitalize">{t('return:view:updateButton')}</Typography>
            </Button>
        );
    }
    if (detail_rma.confirm_shipping.status) {
        UpdateStatusButton = () => (
            <>
                <a href={detail_rma.confirm_shipping.print_label_url} download className={styles.btnPrintLabel}>
                    <Button fullWidth variant="outlined">
                        <Typography letter="capitalize">{t('return:view:printLabel')}</Typography>
                    </Button>
                </a>
                <Button fullWidth variant="outlined" onClick={actionUpdateStatus}>
                    <Typography letter="capitalize">{t('return:view:confirmShipping')}</Typography>
                </Button>
            </>
        );
    }

    return (
        <>
            <ConfirmModal
                open={state.openDialog}
                handleCancel={() => setState({ ...state, openDialog: false })}
                handleYes={state.handleYes}
                message={state.messageDialog}
            />
            <div className="column">
                {
                    detail_rma.confirm_shipping.status
                        ? (<div className={styles.block} dangerouslySetInnerHTML={{ __html: detail_rma.confirm_shipping.step }} />)
                        : null
                }
                <div className={classNames(styles.block, styles.detail)}>
                    <Typography variant="title" letter="uppercase" type="bold">
                        Status
                    </Typography>
                    <Typography variant="span">{detail_rma.status.name}</Typography>
                    <Typography variant="title" letter="uppercase" type="bold">
                        {t('return:view:orderDate')}
                    </Typography>
                    <Typography variant="span">{formatDate(detail_rma.order_date)}</Typography>
                    <Typography variant="title" letter="uppercase" type="bold">
                        Order
                    </Typography>
                    <Typography variant="span">
                        #
                        {detail_rma.order_number}
                    </Typography>
                    {
                        detail_rma.customer_address && (
                            <>
                                <Typography variant="title" letter="uppercase" type="bold">
                                    {t('return:view:myAddress')}
                                </Typography>
                                <Typography variant="span" align="center">
                                    {detail_rma.customer_address.firstname || ''}
                                    <br />
                                    {detail_rma.customer_address.street || ''}
                                    <br />
                                    {detail_rma.customer_address.city || ''}
                                    <br />
                                    {detail_rma.customer_address.region || ''}
                                    <br />
                                    {detail_rma.customer_address.country_id || ''}
                                    <br />
                                    {detail_rma.customer_address.telephone || ''}
                                    <br />
                                    {detail_rma.customer_address.postcode || ''}
                                </Typography>
                            </>
                        )
                    }
                    {
                        requestFormField.length > 0 && requestFormField.map((item, index) => {
                            const name = item.name.split(' ').join('_').toLowerCase();
                            const options = item.options.map((op) => ({
                                label: op.frontend_labels[0].value,
                                value: op.id,
                            }));
                            const fieldValue = requestFieldValue.filter(({ field }) => field === item.id);
                            return (
                                <React.Fragment key={index}>
                                    <Typography variant="title" letter="uppercase" type="bold">
                                        {item.frontend_labels[0].value}
                                    </Typography>
                                    {
                                        item.is_editable ? (
                                            <ItemField
                                                options={options}
                                                name={name}
                                                propsValue={{
                                                    field_id: item.id,
                                                }}
                                                defaultValue={fieldValue[0].value || ''}
                                                onSelect={changeOptionCustomField}
                                                showLabel={false}
                                                required={item.is_required}
                                            />
                                        ) : (
                                            <Typography variant="span">
                                                {fieldValue[0].valueLabel}
                                            </Typography>
                                        )
                                    }

                                </React.Fragment>
                            );
                        })
                    }
                </div>
                <div className={styles.block}>
                    {
                        detail_rma.items.map((item, index) => (
                            <ItemProduct key={index} {...item} currency={currency} />
                        ))
                    }
                </div>
                <div className={styles.block}>
                    <TextField
                        name="message"
                        onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                        value={formData.message}
                        placeholder={t('return:form:placeholder:message')}
                        label={t('return:form:label:message')}
                        multiline
                        rows={4}
                    />
                </div>
                <div className={styles.block}>
                    <DropFile
                        value={state.dropValue}
                        setValue={(dropValue) => setState({ ...state, dropValue })}
                        label={t('return:form:placeholder:uploadFile')}
                        getBase64={handleGetBase64}
                        acceptedFile={fileAccept}
                    />
                </div>
                <div className={classNames(styles.block, styles.footer)}>
                    { UpdateButton() }
                    { CancelButton() }
                    { UpdateStatusButton() }
                </div>
                <ListMessage data={detail_rma.thread_message} />
            </div>
        </>
    );
};

export default DetailReturn;
