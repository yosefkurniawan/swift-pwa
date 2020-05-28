const requestGraph = require('../../graphql-request');

const querySetDefault = `
    mutation updateCustomerAddress(
        $defaultBilling: Boolean
        $defaultShipping: Boolean
        $addressId: Int!
    ) {
        updateCustomerAddress(
            id: $addressId,
            input: {
                default_billing: $defaultBilling
                default_shipping: $defaultShipping
            }
        ) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

const query = `
    mutation updateCustomerAddress(
        $city: String
        $countryCode: CountryCodeEnum
        $customAttributes: [CustomerAddressAttributeInput]
        $defaultBilling: Boolean
        $defaultShipping: Boolean
        $firstname: String
        $lastname: String
        $telephone: String
        $postcode: String
        $street: String
        $region: String
        $regionCode: String
        $regionId: Int
        $addressId: Int!
    ) {
        updateCustomerAddress(
            id: $addressId,
            input: {
                city: $city
                country_code: $countryCode
                country_id: $countryCode
                custom_attributes: $customAttributes
                default_billing: $defaultBilling
                default_shipping: $defaultShipping
                firstname: $firstname
                lastname: $lastname
                postcode: $postcode
                street: [$street]
                telephone: $telephone
                region: { region: $region, region_code: $regionCode, region_id: $regionId }
            }
        ) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

async function updateCustomerAddress(parent, args, context) {
    let variables = {};
    if (args.input.firstname) {
        variables = {
            addressId: args.id,
            city: args.input.city,
            countryCode: args.input.country_code,
            defaultBilling: args.input.default_billing,
            defaultShipping: args.input.default_shipping,
            firstname: args.input.firstname,
            lastname: args.input.lastname,
            postcode: args.input.postcode,
            telephone: args.input.telephone,
            street: args.input.street[0],
            region: args.input.region.region,
            regionCode: args.input.region.region_code,
            regionId: args.input.region.region_id,
            customAttributes: args.input.custom_attributes,
        };
    } else {
        variables = {
            addressId: args.id,
            defaultBilling: args.input.default_billing,
            defaultShipping: args.input.default_shipping,
            street: args.input.street[0],
        };
    }
    const res = await requestGraph(args.input.firstname ? query : querySetDefault, variables, context);
    if (res.updateCustomerAddress) {
        return res.updateCustomerAddress;
    }
    return res;
}

module.exports = updateCustomerAddress;
