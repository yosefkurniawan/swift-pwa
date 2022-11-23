const getAppEnv = () => {
    if (typeof window !== 'undefined') {
        return window.APP_ENV;
    }

    return process.env.APP_ENV;
};

const getAccessEnv = () => process.env.ACCESS_KEY;

const getChatConfigUsername = () => process.env.CHAT_CONFIG_USERNAME;

const getChatConfigPassword = () => process.env.CHAT_CONFIG_PASSWORD;

module.exports = {
    getAppEnv,
    getAccessEnv,
    getChatConfigUsername,
    getChatConfigPassword,
};
