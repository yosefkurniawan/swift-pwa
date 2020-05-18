const requestGraph = require('../../graphql-request');


const query = `
    mutation createCustomerAddress(
        $city: String!
        $countryCode: CountryCodeEnum!
        $customAttributes: [CustomerAddressAttributeInput]
        $defaultBilling: Boolean!
        $defaultShipping: Boolean!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
        $regionCode: String
        $regionId: Int
    ) {
        createCustomerAddress(
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

async function createCustomerAddress(parent, variables, context) {
    const res = await requestGraph(query, variables.input, context);
    console.log(res);
    if (res.createCustomerAddress) {
        return res.createCustomerAddress;
    }
    return res;
}

module.exports = createCustomerAddress;
