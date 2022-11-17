const getAppEnv = () => {
    if (typeof window !== 'undefined') {
        return window.APP_ENV;
    }

    return process.env.APP_ENV;
};

const getAccessEnv = () => process.env.ACCESS_KEY;

module.exports = {
    getAppEnv,
    getAccessEnv,
};
