/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
import { formatPrice } from '@helper_currency';

const Radio = ({
    val, selectOptions, data, dynamicPrice,
}) => (
    <div className="options-container">
        <input
            className="product-optionItem-radio"
            type="radio"
            onClick={() => selectOptions(data, val.id)}
            id={val.id}
            name={data.position}
            value={val.id}
            defaultChecked={val.is_default}
        />
        <label
            className="label-options"
            htmlFor={val.id}
            dangerouslySetInnerHTML={{
                __html: `${val.label} + <b>${formatPrice(dynamicPrice === false
                    ? val.price
                    : val.product.price_range.minimum_price.final_price.value,
                val.product.price_range.minimum_price.final_price.currency)}</b>`,
            }}
        />
        <br />
    </div>
);

export default Radio;
