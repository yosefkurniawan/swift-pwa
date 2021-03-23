const NextI18Next = require('next-i18next').default;
const path = require('path');
const { translation } = require('../../swift.config');

const localeSubpaths = {};

module.exports = new NextI18Next({
    otherLanguages: translation.languages.filter((lang) => lang !== translation.defaultLanguage),
    localeSubpaths,
    defaultLanguage: translation.defaultLanguage,
    fallbackLng: translation.languages,
    localePath: path.resolve('./public/static/locales'),
    shallowRender: true,
    serverLanguageDetection: false,
});
