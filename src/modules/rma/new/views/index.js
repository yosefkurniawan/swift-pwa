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
import useStyles from './styles';

const NewReturnRma = (props) => {
    const {
        t, data: { custom_fields }, state, changeOptionCustomField,
        selectAll, deselectAll, products, fileAccept, handleGetBase64,
        selectItem, formData, setFormData, handleSubmit, handleSelectProduct,
        ItemProduct, ItemField,
    } = props;
    const styles = useStyles();
    return (
        <div className="column">
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
                                    errorForm={state.errorForm}
                                    onSelect={changeOptionCustomField}
                                    label={item.frontend_labels[0].value}
                                    required={item.is_required}
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
