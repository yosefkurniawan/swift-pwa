/* eslint-disable no-unused-vars */
const requestGraph = require('../graphql-request');

const query = `
query checkBalance($gift_card_code: String!) {
    giftCardAccount(input:{
        gift_card_code: $gift_card_code
    }){
        code
        balance
        initial_balance
        expiration_date
    }
}
`;

async function customer(parent, variables, context) {
    const res = await requestGraph(query, { gift_card_code: variables.input.gift_card_code }, context);
    if (res && res.giftCardAccount) {
        return res.giftCardAccount;
    }
    return res;
}

module.exports = customer;
