const getAppEnv = () => {
    if (typeof window !== 'undefined') {
        return window.APP_ENV;
    }

    return process.env.APP_ENV;
};

const getAccessEnv = () => {
    if (typeof window !== 'undefined') {
        return window.ACCESS_KEY;
    }

    return process.env.ACCESS_KEY;
};

module.exports = {
    getAppEnv,
    getAccessEnv,
};
