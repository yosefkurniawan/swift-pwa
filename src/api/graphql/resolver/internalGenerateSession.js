const { encrypt } = require('../../../helpers/encryption');

const internalGenerateSession = async (parent, { token }, context) => {
    if (typeof token !== 'undefined') {
        context.session.token = encrypt(token);
        return {
            result: true,
        };
    }
    return {
        result: false,
    };
};

module.exports = internalGenerateSession;
