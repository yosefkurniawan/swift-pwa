const typeDefs = `
type Token {
    originalToken: String
    token: String
    message: String
    is_email_confirmation: Boolean
}

type ExchangeRate {
    currency_to: String
    rate: Float
}

type Currency {
    base_currency_code: String
    base_currency_symbol: String
    default_display_currency_code: String
    default_display_currency_symbol: String
    available_currency_codes: [String]
    exchange_rates: [ExchangeRate]
}

type Stores {
    store_code: ID
    store_name: String
    locale: String
    is_default_store: Boolean
}

type Query {
    getCustomerToken: Token
    internalGetCurrency: Currency
    internalGetAvailableStores: [Stores]
}

type RevokeCustomerTokenOutput {
    result: Boolean
}

input internalCreateCustomerTokenInput {
    firstname: String
    lastname: String
    email: String
    gender: Int
    date_of_birth: String
    password: String
    phonenumber: String
    is_subscribed: Boolean
    otp: String
    whatsapp_number: String
}

input internalCreateSocialLoginInput {
    firstname: String
    lastname: String
    email: String
    socialtoken: String
}

type internalGenerateSessionOutput {
    result: Boolean
    isLogin: Boolean
    cartId: String
    redirect_path: String
    storeCode: String
    adminId: String
}

type internalDeleteSessionOutput {
    result: Boolean
}

input internalSetCheckoutSessionInput {
    cart_id: String
}

type Scv2 {
    url: String
}

type Mutation {
    internalGenerateCustomerToken(username: String!, password: String!): Token
    internalCreateCustomerToken(input: internalCreateCustomerTokenInput): Token
    internalGenerateCustomerTokenCustom(username: String!, password: String!): Token
    internalGenerateCartTokenSession(input: internalSetCheckoutSessionInput): Token
    internalCreateSocialLogin(input: internalCreateSocialLoginInput): Token
    internalGenerateCustomerTokenOtp(username: String!, otp: String!): Token
    internalDeleteCustomerToken: RevokeCustomerTokenOutput
    internalGenerateSession(state: String!): internalGenerateSessionOutput
    internalDeleteSession: internalDeleteSessionOutput
    internalGetInstagramFeed(token: String!): internalGetInstagramFeedOutput
    internalGetScv2Url(cart_id: String!): Scv2
}

type internalGetInstagramFeedItem {
    id: String,
    media_type: String
    media_url: String
    permalink: String
    caption: String
    username: String
}

type internalGetInstagramFeedOutput {
    message: String
    data: [internalGetInstagramFeedItem]
    err: String
}
`;

module.exports = typeDefs;
