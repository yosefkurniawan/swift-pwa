/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import TextField from '@components/Forms/TextField';
import classNames from 'classnames';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Divider from '@material-ui/core/Divider';
import DropFile from '@components/DropFile';
import CheckBox from '@components/Forms/CheckBox';
import Message from '@components/Toast';
import Loading from '@components/Loaders/Backdrop';
import Router from 'next/router';
import { requestRma } from '../../services/graphql';
import useStyles from '../style';
import ItemProduct from './ItemProduct';
import ItemField from './ItemField';


const NewReturnRma = (props) => {
    const {
        t, data: { custom_fields, items, allowed_file_extensions }, storeConfig, customerData,
        order_number,
    } = props;
    const styles = useStyles();
    const [formData, setFormData] = React.useState({
        order_number,
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
    });

    let products = [];
    const currency = storeConfig ? storeConfig.base_currency_code : 'IDR';
    const [postRma] = requestRma();

    const handleSelectProduct = (val) => {
        setSelectItem(val);
    };

    const selectAll = () => {
        const selected = [];
        items.map(({ item_id, is_returnable }) => is_returnable && selected.push(item_id));
        setSelectItem(selected);
    };

    const deselectAll = () => setSelectItem([]);
    if (items.length > 0) {
        const itemsChild = items.filter((item) => {
            if (item.parent_item_id !== null) {
                return item;
            }
        });
        const simpleData = items.filter((item) => !itemsChild.find(({ sku }) => item.sku === sku) && item);
        products = [...itemsChild, ...simpleData];
        products = products.map((product) => ({
            label: product.name,
            value: product.item_id,
            form: custom_fields,
            disabled: !product.is_returnable,
            currency,
            formData,
            setFormData,
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
        setState({ ...state, loading: true });
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
                await setState({
                    ...state,
                    loading: false,
                    openMessage: true,
                    textMessage: t('return:form:addSuccess'),
                    variantMessage: 'success',
                });
                setTimeout(() => {
                    Router.push(
                        '/rma/customer/view/id/[id]',
                        `/rma/customer/view/id/${res.data.createRequestAwRma.detail_rma.increment_id}`,
                    );
                }, 1500);
            }
        }).catch((e) => {
            setState({
                ...state,
                loading: false,
                openMessage: true,
                textMessage: e.message.split(':')[1] || t('return:form:addFailed'),
                variantMessage: 'error',
            });
        });
    };

    let fileAccept = '';
    if (allowed_file_extensions.length > 0) {
        allowed_file_extensions.map((ext) => {
            fileAccept += `.${ext},`;
        });
    }

    return (
        <div className="column">
            <Loading open={state.loading} />
            <Message
                open={state.openMessage}
                variant={state.variantMessage}
                setOpen={() => setState({ ...state, openMessage: false })}
                message={state.textMessage}
            />
            <div className={classNames(styles.block)}>
                {
                    custom_fields && custom_fields.length > 0 && custom_fields.map((item, index) => {
                        if (item.refers === 'request') {
                            const name = item.name.split(' ').join('_').toLowerCase();
                            const options = item.options.map((op) => ({
                                label: op.frontend_labels[0].value,
                                value: op.id,
                            }));
                            return (
                                <ItemField
                                    key={index}
                                    options={options}
                                    name={name}
                                    propsValue={{
                                        field_id: item.id,
                                    }}
                                    onSelect={changeOptionCustomField}
                                    label={item.frontend_labels[0].value}
                                />
                            );
                        } return null;
                    })
                }
            </div>
            <div className={styles.labelProduct}>
                <Typography variant="title">{t('return:product')}</Typography>
            </div>
            <div className={styles.selectProductContainer}>
                <span onClick={selectAll}>
                    <Typography variant="label">{t('return:selectAll')}</Typography>
                </span>
                <Divider orientation="vertical" flexItem />
                <span onClick={deselectAll}>
                    <Typography variant="label">{t('return:deselectAll')}</Typography>
                </span>
            </div>
            <div className={styles.block}>
                {products.length > 0
                            && (
                                <CheckBox
                                    data={products}
                                    label=""
                                    value={selectItem}
                                    onChange={handleSelectProduct}
                                    flex="column"
                                    CustomItem={ItemProduct}
                                />
                            )}
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
                <DropFile label={t('return:form:placeholder:uploadFile')} getBase64={handleGetBase64} acceptedFile={fileAccept} />
            </div>
            <div className={styles.block}>
                <Button fullWidth onClick={handleSubmit}>
                    <Typography letter="capitalize" color="white">{t('return:form:submit')}</Typography>
                </Button>
            </div>
        </div>
    );
};

export default NewReturnRma;
