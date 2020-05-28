const requestGraph = require('../../graphql-request');
const cartOutput = require('./schema/cartOutput');

const query = {
    addressId: `
        mutation($addressId: Int!, $cartId: String!) {
            setBillingAddressOnCart(input: { cart_id: $cartId, billing_address: { same_as_shipping: true, customer_address_id: $addressId } }) {
                cart {
                    ${cartOutput}
                }
            }
        }
    `,
    addressInput: `
        mutation(
            $cartId: String!
            $city: String!
            $countryCode: String!
            $firstname: String!
            $lastname: String!
            $telephone: String!
            $postcode: String!
            $street: String!
            $region: String!
        ) {
            setBillingAddressOnCart(
                input: {
                    cart_id: $cartId
                    billing_address: {
                        same_as_shipping: true
                        address: {
                            city: $city
                            country_code: $countryCode
                            firstname: $firstname
                            lastname: $lastname
                            telephone: $telephone
                            region: $region
                            street: [$street]
                            postcode: $postcode
                            save_in_address_book: true
                        }
                    }
                }
            ) {
                cart {
                    ${cartOutput}
                }
            }
        }
    `,
};

async function setBillingAddressOnCart(parent, variables, context) {
    const { customer_address_id, address } = variables.input.billing_address;

    const vars = {
        cartId: variables.input.cart_id,
        addressId: customer_address_id,
        city: address ? address.city : null,
        countryCode: address ? address.country_code : null,
        firstname: address ? address.firstname : null,
        lastname: address ? address.lastname : null,
        telephone: address ? address.telephone : null,
        postcode: address ? address.postcode : null,
        street: address ? address.street[0] : null,
        region: address ? address.region : null,
    };

    const finalQuery = customer_address_id ? query.addressId : query.addressInput;

    const res = await requestGraph(finalQuery, vars, context);
    if (res.setBillingAddressOnCart) {
        return res.setBillingAddressOnCart;
    }
    return res;
}

module.exports = setBillingAddressOnCart;
