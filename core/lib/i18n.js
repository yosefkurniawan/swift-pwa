const NextI18Next = require('next-i18next').default;
const path = require('path');

const localeSubpaths = {};

module.exports = new NextI18Next({
    otherLanguages: ['id'],
    localeSubpaths,
    fallbackLng: ['id', 'en'],
    localePath: path.resolve('./public/static/locales'),
    shallowRender: true,
});
