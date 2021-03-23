const NextI18Next = require('next-i18next').default;
const path = require('path');
const { translatable } = require('../../swift.config');

const localeSubpaths = {};

module.exports = new NextI18Next({
    otherLanguages: translatable.languages.filter((lang) => lang !== translatable.defaultLanguage),
    localeSubpaths,
    defaultLanguage: translatable.defaultLanguage,
    fallbackLng: translatable.languages,
    localePath: path.resolve('./public/static/locales'),
    shallowRender: true,
    serverLanguageDetection: false,
});
