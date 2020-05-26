/* --------------------------------------- */
/* STORE CONFIGURATION
/* --------------------------------------- */

/* Base URL */
const BASE_URL = 'https://swiftpwa.testingnow.me/';

const HOST = {
    dev: 'http://localhost:3000',
    prod: 'https://swiftpwa.testingnow.me',
};

/* Magento GraphQL Endpoint */
const graphqlEndpoint = {
    dev: 'https://swiftpwa-be.testingnow.me/graphql',
    prod: 'https://swiftpwa-be.testingnow.me/graphql',
};

const graphqlInternalEndpoint = {
    dev: 'http://localhost:3000/graphql',
    prod: 'https://swiftpwa.testingnow.me/graphql',
};

/* --------------------------------------- */
/* FEATURES CONFIGURATION
/* --------------------------------------- */

/* Social Sharing */
const shareIcon = {
    facebook: true,
    twitter: true,
    line: true,
    email: true,
    telegram: true,
    pinterest: false,
    linkedin: false,
};

const passwordStrength = {
    minValue: 8,
    maxValue: 20,
    numberOfRequiredClass: 3, // Lowercase + Uppercse + Dgits + spesial caracter = 4
};

/* Translation */
const languagesLabel = {
    id: 'Bahasa Indonesia',
    en: 'English',
};

/* Google Tag Manager */
const GTM = {
    enable: true,
    gtmId: {
        dev: 'GTM-N76V8KQ',
        prod: 'GTM-N76V8KQ',
    },
};

/* Store Credit, Reward Point, Gift Card */
const customerFeautres = {
    storeCredit: true,
    rewardPoint: true,
    giftCard: true,
};

/* --------------------------------------- */
/* LOCAD DATA CACHE & COKIES
/* --------------------------------------- */

const expiredCokies = 6;
const storeConfigNameCokie = 'storeConfig';
const nameCartId = 'nci';
const custDataNameCookie = 'cdt';

const keyEncrypt = 'I wrote code anything searching bug and coffe';
const algorithm = 'aes-256-cbc';

const nameToken = 'sk';
const expiredToken = new Date(Date.now() + 1000 * 60 * 60);
const expiredDefault = 365;

/* List Of CMS Pages: [url-1, url-2, ..., url-n] */
const cmsPages = ['about-us'];

const loaderImage = '/assets/img/sample/spinner.svg';

/* identifiers for cmsBlocks in contact page */
const cmsContactIdentifiers = 'weltpixel_contact_page';

const SESSION_SECRET = 'asdasdd1212ads12!!!@**DADxx1';

const productImageSize = {
    width: 240,
    height: 300,
};

module.exports = {
    GTM,
    BASE_URL,
    HOST,
    graphqlEndpoint,
    graphqlInternalEndpoint,
    shareIcon,
    passwordStrength,
    languagesLabel,
    expiredCokies,
    storeConfigNameCokie,
    nameCartId,
    keyEncrypt,
    algorithm,
    nameToken,
    expiredToken,
    expiredDefault,
    cmsPages,
    loaderImage,
    cmsContactIdentifiers,
    SESSION_SECRET,
    productImageSize,
    custDataNameCookie,
    customerFeautres,
};
