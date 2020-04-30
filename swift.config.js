/* --------------------------------------- */
/* STORE CONFIGURATION
/* --------------------------------------- */

/* Base URL */
export const BASE_URL = 'https://swiftpwa-be.testingnow.me/';

/* Magento GraphQL Endpoint */
export const graphqlEndpoint = {
    dev: 'https://swiftpwa-be.testingnow.me/graphql',
    prod: 'https://swiftpwa-be.testingnow.me/graphql',
};

/* --------------------------------------- */
/* KEYS
/* --------------------------------------- */

export const gmapKey = 'AIzaSyBW4WSlBcEfik1qxqv3YGcDxD41Lo4we6c';
/* --------------------------------------- */
/* FEATURES CONFIGURATION
/* --------------------------------------- */

/* Social Sharing */
export const shareIcon = {
    facebook: true,
    twitter: true,
    line: true,
    email: true,
    telegram: true,
    pinterest: false,
    linkedin: false,
};

export const passwordStrength = {
    minValue: 8,
    maxValue: 20,
    numberOfRequiredClass: 3, // Lowercase + Uppercse + Dgits + spesial caracter = 4
};

export const languagesLabel = {
    id: 'Bahasa Indonesia',
    en: 'English',
};

/* --------------------------------------- */
/* LOCAD DATA CACHE & COKIES
/* --------------------------------------- */

export const expiredCokies = 6;
export const storConfigNameCokie = 'storeConfig';
export const nameCartId = 'nci';

export const keyEncrypt = 'I wrote code anything searching bug and coffe';
export const algorithm = 'aes-256-cbc';

export const nameToken = 'sk';
export const expiredToken = new Date(Date.now() + 1000 * 60 * 60);
export const expiredDefault = 365;

/* List Of CMS Pages: [url-1, url-2, ..., url-n] */
export const cmsPages = ['about-us'];
