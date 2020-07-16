import Typography from '@components/Typography';
import { formatPrice } from '@helpers/currency';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import useStyles from '../styles';
import ItemField from '../ItemField';

const ItemProductView = (props) => {
    const {
        t, checked, disabled, handleChange, name,
        image_url, price, currency, other_rma_request,
        qty_returnable, errorForm, optionQty, changeOptionCustomField,
        handleQty, form,
    } = props;
    const styles = useStyles();
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
                {disabled ? <Typography color="red">{t('rma:noItemReturn')}</Typography> : null}
                {other_rma_request && other_rma_request.length > 0 ? (
                    <div className="column">
                        <Typography color="red">{t('rma:otherRequestRma')}</Typography>
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
                        t={t}
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
                                      t={t}
                                  />
                              );
                          }
                          return null;
                      })
                    : !disabled && <Typography align="center">{t('rma:form:label:tickSelect')}</Typography>}
            </div>
        </div>
    );
};

export default ItemProductView;
