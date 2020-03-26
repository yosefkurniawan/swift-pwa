const NextI18Next = require("next-i18next").default;

module.exports = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["id"],
  // workaround until next-i18next support public path
  // https://github.com/isaachinman/next-i18next/issues/523
  // localePath: "src/translation"
  localePath: typeof window === "undefined" ? "src/translation/locales" : "src/translation/locales"
});