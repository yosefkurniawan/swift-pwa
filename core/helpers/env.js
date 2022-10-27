const getAppEnv = () => {
    if (typeof window !== 'undefined') {
        return window.APP_ENV;
    }

    return process.env.APP_ENV;
};

const getHeaderEnv = () => {
    if (typeof window !== 'undefined') {
        return window.HEADER_ENV;
    }

    return process.env.HEADER_ENV;
};

module.exports = {
    getAppEnv,
    getHeaderEnv,
};
