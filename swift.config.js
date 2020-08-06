/* --------------------------------------- */
/* STORE CONFIGURATION
/* --------------------------------------- */

const HOST = {
    local: 'http://localhost:3000',
    dev: 'https://swiftpwa.testingnow.me',
    stage: 'https://pwa.getswift.asia.dmmy.me',
    prod: 'https://pwa.getswift.asia',
};

/* Magento GraphQL Endpoint */
const graphqlEndpoint = {
    local: 'https://swiftpwa-be.testingnow.me/graphql',
    dev: 'https://swiftpwa-be.testingnow.me/graphql',
    stage: 'https://swiftpwa-be.testingnow.me/graphql',
    prod: 'https://b2cdemo.getswift.asia/graphql',
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

/* Google Tag Manager
 * before enable this configuration, firstly you need to import the gtm tags json.
 * gtm tags json need to be exported from Magento admin in Welpixel GTM configuration.
 * adjust the tag name if you want before import into GTM dashboard setting.
 * as reference you can find sample gtm tags in folder "sample/gtm" folder
 * NOTE: this GTM functionality includes connecting to GA via GTM tag.
 */
const GTM = {
    enable: false,
    gtmId: {
        local: '', // sample: GTM-N76V8KQ
        dev: '', // sample: GTM-N76V8KQ
        stage: '', // sample: GTM-N76V8KQ
        prod: '', // sample: GTM-N76V8KQ
    },
};

/* Recapthca Configuration */
const recaptcha = {
    enable: false,
    siteKey: {
        local: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        dev: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        stage: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        prod: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
    },
    serverKey: {
        local: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        dev: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        stage: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        prod: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
    },
};

/* Store Credit, Reward Point, Gift Card */
const customerFeautres = {
    storeCredit: true,
    rewardPoint: true,
    giftCard: true,
    confirmPayment: true,
    pickupStore: true,
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

/* Dashboard */
// identifiers for cmsBlocks in contact page
const cmsSocialMediaLinkIdentifiers = 'pwa_socmed_links';

/* Social media link */
// social media link in dashboard
const enableSocialMediaLink = true;

/* Loader */
const loaderImage = '/assets/img/loader.svg';

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
        width: 960,
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
const nameToken = 'sk';
const expiredToken = new Date(Date.now() + 1000 * 60 * 60);
const expiredDefault = 365;

const features = {
    ssrCache: true,
    facebookMetaId: {
        enabled: false,
        app_id: '', // if enabled add fb app id here. e.g. 3080154482073095
    },
    productListing: {
        configurableOptions: false,
        rating: false,
        wishlist: true,
    },
    productAvailableToCart: {
        SimpleProduct: true,
        ConfigurableProduct: true,
        VirtualProduct: true,
        GroupedProduct: false,
        BundleProduct: false,
        DownloadableProduct: false,
    },
};

const nossrCache = [
    '/aw_rewardpoints/info',
    '/sales/order/history',
    '/customer/account/profile',
    '/customer/account/address',
    '/awgiftcard/card',
    '/customer/account/storecredit',
    '/inboxnotification/notification',
    '/customer/setting',
    '/rma/customer',
    '/confirmpayment',
    '/checkout',
    '/checkout/cart',
    '/graphql',
];

const debuging = {
    originalError: false,
};

module.exports = {
    debuging,
    blog,
    GTM,
    HOST,
    graphqlEndpoint,
    shareIcon,
    passwordStrength,
    languagesLabel,
    expiredCokies,
    storeConfigNameCokie,
    nameCartId,
    nameToken,
    expiredToken,
    expiredDefault,
    cmsPages,
    loaderImage,
    cmsContactIdentifiers,
    cmsSocialMediaLinkIdentifiers,
    imageSize,
    custDataNameCookie,
    customerFeautres,
    nameCheckoutCookie,
    nameGlobalCookie,
    showBrandPage,
    enableSocialMediaLink,
    features,
    nossrCache,
    recaptcha,
};
