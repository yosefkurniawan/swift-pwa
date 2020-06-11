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

/* Password Validator */
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
    confirmPayment: true,
};

/* Blog */
const blog = {
    urlPath: '/blog',
};

/* Brand Page */
const showBrandPage = true;

/* List Of CMS Pages: [url-1, url-2, ..., url-n] */
const cmsPages = ['about-us', 'aw-reward-points'];

/* Contact Us */
// identifiers for cmsBlocks in contact page
const cmsContactIdentifiers = 'weltpixel_contact_page';

/* Loader */
const loaderImage = '/assets/img/sample/spinner.svg';

/* config general size image used on frontend */
const imageSize = {
    product: {
        width: 240,
        height: 300,
    },
    homeSlider: {
        width: 960,
        height: 1120,
    },
    category: {
        width: 860,
        height: 577,
    },
};

/* --------------------------------------- */
/* LOCAD DATA CACHE & COKIES
/* --------------------------------------- */

const expiredCokies = 6;
const storeConfigNameCokie = 'storeConfig';
const nameCartId = 'nci';
const custDataNameCookie = 'cdt';
const nameCheckoutCookie = 'ccdt';
const nameGlobalCookie = 'spwa';

const keyEncrypt = 'I wrote code anything searching bug and coffe';
const algorithm = 'aes-256-cbc';

const nameToken = 'sk';
const expiredToken = new Date(Date.now() + 1000 * 60 * 60);
const expiredDefault = 365;

const SESSION_SECRET = 'asdasdd1212ads12!!!@**DADxx1';

module.exports = {
    blog,
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
    imageSize,
    custDataNameCookie,
    customerFeautres,
    nameCheckoutCookie,
    nameGlobalCookie,
    showBrandPage,
};
