/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import Alert from '@material-ui/lab/Alert';
import Thumbor from '@common_image';
import { formatPrice } from '@helper_currency';
import { useTranslation } from '@i18n';

const Item = (props) => {
    const {
        errorCartItems, quantity, custom_price, product, deleteCart, updateCart, id, configurable_options, bundle_options, customizable_options,
        SimpleMiniCustomizable, ConfigurableMiniCustomizable,
        aw_giftcard_option, storeConfig, currencyCache,
    } = props;
    const { t } = useTranslation(['common']);
    const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;

    return (
        <li>
            <div id="plugin-minicart-itemsProduct" className="product">
                <Link href="/[...slug]" as={`/${product.url_key}`} passHref>
                    <a className="product-item-photo">
                        <Thumbor
                            className="product-image-photo"
                            src={product.small_image.url}
                            alt={product.small_image.label}
                            width={75}
                            height={92}
                            storeConfig={storeConfig}
                        />
                        {custom_price?.row_total_incl_tax?.value === 0 ? <span>{t('common:title:free')}</span> : null}
                    </a>
                </Link>
                <div className="product-item-details">
                    <strong className="product-item-name">
                        <Link href="/[...slug]" as={`/${product.url_key}`}>
                            <a>{product.name}</a>
                        </Link>
                    </strong>
                    {configurable_options && configurable_options.length ? (
                        <div className="product-options">
                            {configurable_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.option_label}</strong>
                                    {' '}
                                    :
                                    {val.value_label}
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {bundle_options && bundle_options.length ? (
                        <div className="product-options">
                            {bundle_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.label}</strong>
                                    {' '}
                                    :
                                    <div className="option-wrapper__item">
                                        {val.values.map((item, idt) => (
                                            <div key={idt}>
                                                {item.quantity}
                                                {' '}
                                                x
                                                {item.label}
                                                {' '}
                                                {/* <strong>
                                                    {' + '}
                                                    {formatPrice(item.price, 'IDR', currencyCache)}
                                                </strong> */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {cartCustomOptions && cartCustomOptions.length ? (
                        <div className="product-options">
                            {cartCustomOptions.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <div className="row option-wrapper__item">
                                        <strong>
                                            {val.label}
                                            {' '}
                                            :
                                        </strong>
                                        {val.values.map((item, idt) => (
                                            <p key={idt} className="option-item">
                                                {item.label && item.label !== '' ? item.label : item.value}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {aw_giftcard_option && aw_giftcard_option.length ? (
                        <div className="product-options">
                            {aw_giftcard_option.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <div className="row option-wrapper__item">
                                        <strong>
                                            {val.label}
                                            {' '}
                                            :
                                        </strong>
                                        {val.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className="product-item-pricing">
                    <div className="details-qty qty">
                        <label className="label" htmlFor="cart-item">
                            Qty
                        </label>

                        <span className="item-minus qty-update" onClick={() => (quantity > 1 ? updateCart(id, quantity - 1) : '')} />
                        <span className="item-count">{quantity}</span>
                        <span className="item-plus qty-update" onClick={() => updateCart(id, quantity + 1)} />
                    </div>
                    <div className="item-price">
                        {formatPrice(custom_price?.price_incl_tax?.value || 0, custom_price?.price_incl_tax?.currency || 'IDR', currencyCache)}
                    </div>
                </div>

                {errorCartItems && errorCartItems.length > 0 && errorCartItems[0] === null && (
                    <div className="oos-info">
                        <span className="oos-info-content">{t('common:cart:oos')}</span>
                    </div>
                )}
                <div
                    className="delete"
                    onClick={() => {
                        deleteCart(props);
                    }}
                >
                    x
                </div>
            </div>
            {
                errorCartItems && errorCartItems.length > 0 && errorCartItems[0] !== null && (
                    <div className="error-status-qty">
                        <Alert severity="warning">{errorCartItems[0]}</Alert>
                    </div>
                )
            }
        </li>
    );
};

export default Item;
