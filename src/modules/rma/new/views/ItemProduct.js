import Typography from '@components/Typography';
import { formatPrice } from '@helpers/currency';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from '@i18n';
import Link from 'next/link';
import useStyles from './styles';
import ItemField from './ItemField';

const ItemProduct = (props) => {
    const { t } = useTranslation(['rma']);
    const {
        name, price, qty_returnable, image_url, dataValues, value, onChange, form, disabled, other_rma_request,
        currency = 'IDR', formData, setFormData, errorForm,
    } = props;
    const styles = useStyles();
    const checked = dataValues.indexOf(value) !== -1;
    const [selectedData, setSelectedData] = React.useState({
        item_id: '',
        qty: 1,
        custom_fields: [],
    });
    const changeSelectedItem = (param) => {
        let allField = formData.order_items;
        const findField = formData.order_items.find((item) => param.item_id === item.item_id);
        if (findField) {
            allField = formData.order_items.filter((item) => item.item_id !== param.item_id);
            allField.push(param);
        } else {
            allField.push(param);
        }
        setFormData({
            ...formData,
            order_items: allField,
        });
    };
    const handleChange = () => {
        onChange(value);
        let allField = formData.order_items;
        const findField = formData.order_items.find((item) => value === item.item_id);
        if (findField) {
            allField = allField.filter((item) => item.item_id !== value);
            setFormData({
                ...formData,
                order_items: allField,
            });
        } else {
            setSelectedData({
                ...selectedData,
                item_id: value,
            });
            changeSelectedItem({
                ...selectedData,
                item_id: value,
            });
        }
    };
    const optionQty = [];
    if (qty_returnable > 0) {
        for (let index = 1; index <= qty_returnable; index += 1) {
            optionQty.push({
                label: index,
                value: index,
            });
        }
    }
    const handleQty = (param) => {
        setSelectedData({
            ...selectedData,
            qty: param.value,
        });
        changeSelectedItem({
            ...selectedData,
            qty: param.value,
        });
    };

    const changeOptionCustomField = (param) => {
        let allField = selectedData.custom_fields;
        const findField = selectedData.custom_fields.find((item) => param.field_id === item.field_id);
        if (findField) {
            allField = selectedData.custom_fields.filter((item) => item.field_id !== param.field_id);
            allField.push(param);
        } else {
            allField.push(param);
        }
        setSelectedData({
            ...selectedData,
            custom_fields: allField,
        });
        changeSelectedItem({
            ...selectedData,
            custom_fields: allField,
        });
    };
    return (
        <div className="column">
            <div className={styles.itemContainer}>
                <Checkbox checked={checked} disabled={disabled} onChange={handleChange} inputProps={{ 'aria-label': name }} />
                <div className={styles.productImgContainer}>
                    <img
                        src={image_url || '/assets/img/placeholder.png'}
                        className={styles.productImg}
                        alt={name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/img/placeholder.png';
                        }}
                    />
                </div>
                <div className={styles.detailItem}>
                    <Typography variant="span" type="semiBold">
                        {name || ''}
                    </Typography>
                    <Typography variant="span">{formatPrice(price, currency)}</Typography>
                    <div className="flex-grow" />
                </div>
            </div>

            <div className={styles.selectItemBox}>
                {disabled ? <Typography color="red">{t('return:noItemReturn')}</Typography> : null}
                {other_rma_request && other_rma_request.length > 0 ? (
                    <div className="column">
                        <Typography color="red">{t('return:otherRequestRma')}</Typography>
                        <div className={styles.listOtherRma}>
                            {other_rma_request.map((number_rma, indx) => (
                                <Link href="/rma/customer/view/id/[id]" as={`/rma/customer/view/id/${number_rma}`} key={indx}>
                                    <a>
                                        <Typography type="semiBold">
                                            #
                                            {number_rma}
                                        </Typography>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : null}
                {checked && qty_returnable > 0 && (
                    <ItemField
                        options={optionQty}
                        name="Qty"
                        label="Qty"
                        onSelect={handleQty}
                    />
                )}
                {checked
                    ? form
                      && form.length > 0
                      && form.map((item, index) => {
                          if (item.refers === 'item') {
                              const names = item.name.split(' ').join('_').toLowerCase();
                              const options = item.options.map((op) => ({
                                  label: op.frontend_labels[0].value,
                                  value: op.id,
                              }));
                              return (
                                  <ItemField
                                      key={index}
                                      options={options}
                                      name={names}
                                      label={item.frontend_labels[0].value}
                                      propsValue={{
                                          field_id: item.id,
                                      }}
                                      errorForm={errorForm}
                                      onSelect={changeOptionCustomField}
                                      required={item.is_required}
                                  />
                              );
                          }
                          return null;
                      })
                    : !disabled && <Typography align="center">{t('return:form:label:tickSelect')}</Typography>}
            </div>
        </div>
    );
};

export default ItemProduct;
