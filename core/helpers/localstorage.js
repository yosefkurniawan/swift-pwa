import { localResolverKey } from '@config';

export const testLocalStorage = () => {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
};

export const removeLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
};

export const setLocalStorage = (key, data) => {
    if (typeof window !== 'undefined' && testLocalStorage() === true) {
        let localData = data;
        if (data && data !== null) {
            localData = JSON.stringify(data);
        }
        localStorage.setItem(key, localData);
    }
    return false;
};

export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined' && testLocalStorage() === true) {
        const data = localStorage.getItem(key);
        if (data && data !== null) {
            return JSON.parse(data);
        }
        return data;
    }
    return false;
};

export const setResolver = (data) => setLocalStorage(localResolverKey, data);

export const getResolver = () => {
    const resolver = getLocalStorage(localResolverKey);
    if (!resolver || typeof resolver !== 'object') {
        return {};
    }
    return resolver;
};

export default {
    setLocalStorage,
    getLocalStorage,
};
