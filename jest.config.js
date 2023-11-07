/* eslint-disable max-len */
module.exports = {
    collectCoverageFrom: ['**/(.*)$.{js,jsx,ts,tsx}', '!**/(.*)$.d.ts', '!**/node_modules/(.*)$*'],
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        // https://jestjs.io/docs/webpack#mocking-css-modules
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

        // Handle CSS imports (without CSS modules)
        '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

        // Handle image imports
        // https://jestjs.io/docs/webpack#handling-static-assets
        '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': '<rootDir>/__mocks__/fileMock.js',

        // Handle module aliases
        '^@root/(.*)$': '<rootDir>/$1',
        '^@pages/(.*)$': '<rootDir>/pages/$1',
        '^@custom/(.*)$': '<rootDir>/src/custom/$1',
        '^@config': '<rootDir>/swift.config.js',
        '^@core_modules/(.*)$': ['<rootDir>/src/modules/$1', '<rootDir>/core/modules/$1'],
        '^@core/(.*)$': ['<rootDir>/src/$1', '<rootDir>/core/$1'],
        '^@core_minicart': ['<rootDir>/src/modules/cart/plugins/mini', '<rootDir>/core/modules/cart/plugins/mini'],
        '^@module_checkout/(.*)$': ['<rootDir>/src/modules/checkout/$1', '<rootDir>/core/modules/checkout/$1'],

        '^@middlewares/(.*)$': ['<rootDir>/src/middlewares/$1', '<rootDir>/core/middlewares/$1'],
        '^@middleware_route': ['<rootDir>/src/middlewares/route', '<rootDir>/core/middlewares/route'],

        '^@services/(.*)$': ['<rootDir>/src/services/$1', '<rootDir>/core/services/$1'],
        '^@extension': ['extension/$1'],
        '^@extension_module': ['extension/modules/$1'],
        '^@next_headcustom': ['<rootDir>/src/nextjs_custom/HeadCustom', '<rootDir>/core/nextjs_custom/HeadCustom'],
        '^@next_nextscriptcustom': ['<rootDir>/src/nextjs_custom/NextScriptCustom', '<rootDir>/core/nextjs_custom/NextScriptCustom'],
        '^@graphql_request': ['<rootDir>/src/api/graphql/request', '<rootDir>/core/api/graphql/request'],
        '^@graphql_ssr': ['<rootDir>/src/api/graphql/ssr', '<rootDir>/core/api/graphql/ssr'],

        '^@lib/(.*)$': ['<rootDir>/src/lib/$1', '<rootDir>/core/lib/$1'],
        '^@lib_apollo': ['<rootDir>/src/lib/apollo', '<rootDir>/core/lib/apollo'],
        '^@lib_gtag': ['<rootDir>/src/lib/gtag', '<rootDir>/core/lib/gtag'],
        '^@lib_firebase/(.*)$': ['<rootDir>/src/lib/firebase/$1', '<rootDir>/core/lib/firebase/$1'],
        '^@i18n': ['<rootDir>/src/lib/i18n', '<rootDir>/core/lib/i18n'],

        '^@layout': ['<rootDir>/src/modules/theme/layout', '<rootDir>/core/modules/theme/layout'],
        '^@layout/$1': ['<rootDir>/src/modules/theme/layout/$1', '<rootDir>/core/modules/theme/layout/$1'],
        '^@layout_customer': ['<rootDir>/src/modules/customer/components/layout', '<rootDir>/core/modules/customer/components/layout'],
        '^@layout_customer/(.*)$': ['<rootDir>/src/modules/customer/components/layout/$1', '<rootDir>/core/modules/customer/components/layout/$1'],

        '^@theme/(.*)$': ['<rootDir>/src/theme/$1', '<rootDir>/core/theme/$1'],
        '^@theme_color': ['<rootDir>/src/theme/colors', '<rootDir>/core/theme/colors'],
        '^@theme_mixins': ['<rootDir>/src/theme/mixins', '<rootDir>/core/theme/mixins'],
        '^@theme_theme': ['<rootDir>/src/theme/theme', '<rootDir>/core/theme/theme'],
        '^@theme_typography': ['<rootDir>/src/theme/typography', '<rootDir>/core/theme/typography'],
        '^@theme_vars': ['<rootDir>/src/theme/vars', '<rootDir>/core/theme/vars'],

        '^@helpers/(.*)$': ['<rootDir>/src/helpers/$1', '<rootDir>/core/helpers/$1'],
        '^@helper_auth': ['<rootDir>/src/helpers/auth', '<rootDir>/core/helpers/auth'],
        '^@helper_cartid': ['<rootDir>/src/helpers/cartId', '<rootDir>/core/helpers/cartId'],
        '^@helper_checkcomponents': ['<rootDir>/src/helpers/checkComponent', '<rootDir>/core/helpers/checkComponent'],
        '^@helper_checkimagesrc': ['<rootDir>/src/helpers/checkImageSrc', '<rootDir>/core/helpers/checkImageSrc'],
        '^@helper_config': ['<rootDir>/src/helpers/config', '<rootDir>/core/helpers/config'],
        '^@helper_cookies': ['<rootDir>/src/helpers/cookies', '<rootDir>/core/helpers/cookies'],
        '^@helper_currency': ['<rootDir>/src/helpers/currency', '<rootDir>/core/helpers/currency'],
        '^@helper_date': ['<rootDir>/src/helpers/date', '<rootDir>/core/helpers/date'],
        '^@helper_encryption': ['<rootDir>/src/helpers/encryption', '<rootDir>/core/helpers/encryption'],
        '^@helper_fonts': ['<rootDir>/src/helpers/fonts', '<rootDir>/core/helpers/fonts'],
        '^@helper_generatequery': ['<rootDir>/src/helpers/generateQuery', '<rootDir>/core/helpers/generateQuery'],
        '^@helper_getpath': ['<rootDir>/src/helpers/getPath', '<rootDir>/core/helpers/getPath'],
        '^@helper_noreload': ['<rootDir>/src/helpers/noReload', '<rootDir>/core/helpers/noReload'],
        '^@helper_passwordstrength': ['<rootDir>/src/helpers/passwordStrength', '<rootDir>/core/helpers/passwordStrength'],
        '^@helper_productbyvariant': ['<rootDir>/src/helpers/productByVariant', '<rootDir>/core/helpers/productByVariant'],
        '^@helper_regex': ['<rootDir>/src/helpers/regex', '<rootDir>/core/helpers/regex'],
        '^@helper_text': ['<rootDir>/src/helpers/text', '<rootDir>/core/helpers/text'],
        '^@helper_theme': ['<rootDir>/src/helpers/theme', '<rootDir>/core/helpers/theme'],
        '^@helper_urlparser': ['<rootDir>/src/helpers/urlParser', '<rootDir>/core/helpers/urlParser'],
        '^@helper_zxcvbn': ['<rootDir>/src/helpers/zxcvbn', '<rootDir>/core/helpers/zxcvbn'],
        '^@helper_localstorage': ['<rootDir>/src/helpers/localstorage', '<rootDir>/core/helpers/localstorage'],
        '^@helper_image': ['<rootDir>/src/helpers/image', '<rootDir>/core/helpers/image'],

        '^@common_button': ['<rootDir>/src/modules/commons/Button', '<rootDir>/core/modules/commons/Button'],
        '^@common_buttonqty': ['<rootDir>/src/modules/commons/ButtonQty', '<rootDir>/core/modules/commons/ButtonQty'],
        '^@common_breadcrumb': ['<rootDir>/src/modules/commons/Breadcrumb', '<rootDir>/core/modules/commons/Breadcrumb'],
        '^@common_confirmdialog': ['<rootDir>/src/modules/commons/ConfirmDialog', '<rootDir>/core/modules/commons/ConfirmDialog'],
        '^@common_dropfile': ['<rootDir>/src/modules/commons/DropFile', '<rootDir>/core/modules/commons/DropFile'],
        '^@common_googlemaps': ['<rootDir>/src/modules/commons/GoogleMaps', '<rootDir>/core/modules/commons/GoogleMaps'],
        '^@common_googlemaps_autocomplete': [
            '<rootDir>/src/modules/commons/GoogleMapsAutocomplete',
            '<rootDir>/core/modules/commons/GoogleMapsAutocomplete',
        ],
        '^@common_gridlist': ['<rootDir>/src/modules/commons/GridList', '<rootDir>/core/modules/commons/GridList'],
        '^@common_priceformat': ['<rootDir>/src/modules/commons/PriceFormat', '<rootDir>/core/modules/commons/PriceFormat'],
        '^@common_ratingstar': ['<rootDir>/src/modules/commons/RatingStar', '<rootDir>/core/modules/commons/RatingStar'],
        '^@common_tabs': ['<rootDir>/src/modules/commons/Tabs', '<rootDir>/core/modules/commons/Tabs'],
        '^@common_toast': ['<rootDir>/src/modules/commons/Toast', '<rootDir>/core/modules/commons/Toast'],
        '^@common_typography': ['<rootDir>/src/modules/commons/Typography', '<rootDir>/core/modules/commons/Typography'],
        '^@common_checkbox': ['<rootDir>/src/modules/commons/CheckBox', '<rootDir>/core/modules/commons/CheckBox'],
        '^@common_password': ['<rootDir>/src/modules/commons/Password', '<rootDir>/core/modules/commons/Password'],
        '^@common_radio': ['<rootDir>/src/modules/commons/Radio', '<rootDir>/core/modules/commons/Radio'],
        '^@common_rangeslider': ['<rootDir>/src/modules/commons/RangeSlider', '<rootDir>/core/modules/commons/RangeSlider'],
        '^@common_select': ['<rootDir>/src/modules/commons/Select', '<rootDir>/core/modules/commons/Select'],
        '^@common_textfield': ['<rootDir>/src/modules/commons/TextField', '<rootDir>/core/modules/commons/TextField'],
        '^@common_carousel': ['<rootDir>/src/modules/commons/carousel', '<rootDir>/core/modules/commons/carousel'],

        '^@common_button/(.*)$': ['<rootDir>/src/modules/commons/Button/$1', '<rootDir>/core/modules/commons/Button/$1'],
        '^@common_buttonqty/(.*)$': ['<rootDir>/src/modules/commons/ButtonQty/$1', '<rootDir>/core/modules/commons/ButtonQty/$1'],
        '^@common_breadcrumb/(.*)$': ['<rootDir>/src/modules/commons/Breadcrumb/$1', '<rootDir>/core/modules/commons/Breadcrumb/$1'],
        '^@common_confirmdialog/(.*)$': ['<rootDir>/src/modules/commons/ConfirmDialog/$1', '<rootDir>/core/modules/commons/ConfirmDialog/$1'],
        '^@common_dropfile/(.*)$': ['<rootDir>/src/modules/commons/DropFile/$1', '<rootDir>/core/modules/commons/DropFile/$1'],
        '^@common_googlemaps/(.*)$': ['<rootDir>/src/modules/commons/GoogleMaps/$1', '<rootDir>/core/modules/commons/GoogleMaps/$1'],
        '^@common_googlemaps_autocomplete/(.*)$': [
            '<rootDir>/src/modules/commons/GoogleMapsAutocomplete/$1',
            '<rootDir>/core/modules/commons/GoogleMapsAutocomplete/$1',
        ],
        '^@common_gridlist/(.*)$': ['<rootDir>/src/modules/commons/GridList/$1', '<rootDir>/core/modules/commons/GridList/$1'],
        '^@common_priceformat/(.*)$': ['<rootDir>/src/modules/commons/PriceFormat/$1', '<rootDir>/core/modules/commons/PriceFormat/$1'],
        '^@common_ratingstar/(.*)$': ['<rootDir>/src/modules/commons/RatingStar/$1', '<rootDir>/core/modules/commons/RatingStar/$1'],
        '^@common_tabs/(.*)$': ['<rootDir>/src/modules/commons/Tabs/$1', '<rootDir>/core/modules/commons/Tabs/$1'],
        '^@common_toast/(.*)$': ['<rootDir>/src/modules/commons/Toast/$1', '<rootDir>/core/modules/commons/Toast/$1'],
        '^@common_typography/(.*)$': ['<rootDir>/src/modules/commons/Typography/$1', '<rootDir>/core/modules/commons/Typography/$1'],
        '^@common_checkbox/(.*)$': ['<rootDir>/src/modules/commons/CheckBox/$1', '<rootDir>/core/modules/commons/CheckBox/$1'],
        '^@common_password/(.*)$': ['<rootDir>/src/modules/commons/Password/$1', '<rootDir>/core/modules/commons/Password/$1'],
        '^@common_radio/(.*)$': ['<rootDir>/src/modules/commons/Radio/$1', '<rootDir>/core/modules/commons/Radio/$1'],
        '^@common_rangeslider/(.*)$': ['<rootDir>/src/modules/commons/RangeSlider/$1', '<rootDir>/core/modules/commons/RangeSlider/$1'],
        '^@common_select/(.*)$': ['<rootDir>/src/modules/commons/Select/$1', '<rootDir>/core/modules/commons/Select/$1'],
        '^@common_textfield/(.*)$': ['<rootDir>/src/modules/commons/TextField/$1', '<rootDir>/core/modules/commons/TextField/$1'],
        '^@common_carousel/(.*)$': ['<rootDir>/src/modules/commons/carousel/$1', '<rootDir>/core/modules/commons/carousel/$1'],

        '^@common_image': ['<rootDir>/src/modules/commons/Image', '<rootDir>/core/modules/commons/Image'],
        '^@common_image/(.*)$': ['<rootDir>/src/modules/commons/Image/$1', '<rootDir>/core/modules/commons/Image/$1'],

        '^@common_backdrop': ['<rootDir>/src/modules/commons/Backdrop', '<rootDir>/core/modules/commons/Backdrop'],
        '^@common_pageprogress': ['<rootDir>/src/modules/commons/PageProgress', '<rootDir>/core/modules/commons/PageProgress'],
        '^@common_backdrop/(.*)$': ['<rootDir>/src/modules/commons/Backdrop/$1', '<rootDir>/core/modules/commons/Backdrop/$1'],
        '^@common_pageprogress/(.*)$': ['<rootDir>/src/modules/commons/PageProgress/$1', '<rootDir>/core/modules/commons/PageProgress/$1'],
        '^@common_slick/(.*)$': ['<rootDir>/src/modules/commons/Slick/$1', '<rootDir>/core/modules/commons/Slick/$1'],
        '^@common_slider/(.*)$': ['<rootDir>/src/modules/commons/Slider/$1', '<rootDir>/core/modules/commons/Slider/$1'],
        '^@common_filterdialog': ['<rootDir>/src/modules/commons/FilterDialog', '<rootDir>/core/modules/commons/FilterDialog'],
        '^@common_filterdialog/(.*)$': ['<rootDir>/src/modules/commons/FilterDialog/$1', '<rootDir>/core/modules/commons/FilterDialog/$1'],
        '^@common_forms/(.*)$': ['<rootDir>/src/modules/commons/Forms/$1', '<rootDir>/core/modules/commons/Forms/$1'],

        '^@common_searchmodal': ['<rootDir>/src/modules/commons/SearchModal', '<rootDir>/core/modules/commons/SearchModal'],
        '^@common_loaders': ['<rootDir>/src/modules/commons/Loaders', '<rootDir>/core/modules/commons/Loaders'],
        '^@common_searchmodal/(.*)$': ['<rootDir>/src/modules/commons/SearchModal/$1', '<rootDir>/core/modules/commons/SearchModal/$1'],
        '^@common_loaders/(.*)$': ['<rootDir>/src/modules/commons/Loaders/$1', '<rootDir>/core/modules/commons/Loaders/$1'],

        '^@common_navigation': ['<rootDir>/src/modules/commons/Navigation', '<rootDir>/core/modules/commons/Navigation'],
        '^@common_spancategory': ['<rootDir>/src/modules/commons/SpanCategory', '<rootDir>/core/modules/commons/SpanCategory'],
        '^@common_span': ['<rootDir>/src/modules/commons/Span', '<rootDir>/core/modules/commons/Span'],
        '^@common_skeleton': ['<rootDir>/src/modules/commons/Skeleton', '<rootDir>/core/modules/commons/Skeleton'],
        '^@common_scrolltotop': ['<rootDir>/src/modules/commons/ScrollToTop', '<rootDir>/core/modules/commons/ScrollToTop'],
        '^@common_headermobile': ['<rootDir>/src/modules/theme/components/header/mobile', '<rootDir>/core/modules/theme/components/header/mobile'],
        '^@common_headerdesktop': ['<rootDir>/src/modules/theme/components/header/desktop', '<rootDir>/core/modules/theme/components/header/desktop'],
        '^@common_restrictionPopup': [
            '<rootDir>/src/modules/theme/components/restrictionPopup',
            '<rootDir>/core/modules/theme/components/restrictionPopup',
        ],
        '^@common_currency': ['<rootDir>/src/modules/setting/components/currency', '<rootDir>/core/modules/setting/components/currency'],
        '^@common_language': ['<rootDir>/src/modules/setting/components/language', '<rootDir>/core/modules/setting/components/language'],
        '^@common_bottomnavigation': [
            '<rootDir>/src/modules/theme/components/bottom-navigation/mobile',
            '<rootDir>/core/modules/theme/components/bottom-navigation/mobile',
        ],
        '^@common_footer': ['<rootDir>/src/modules/theme/components/footer/desktop', '<rootDir>/core/modules/theme/components/footer/desktop'],
        '^@common_productlabel': ['<rootDir>/src/modules/commons/ProductLabel', '<rootDir>/core/modules/commons/ProductLabel'],
        '^@common_optionconfigurable': ['<rootDir>/src/modules/commons/OptionConfigurable', '<rootDir>/core/modules/commons/OptionConfigurable'],

        '^@common_navigation/(.*)$': ['<rootDir>/src/modules/commons/Navigation/$1', '<rootDir>/core/modules/commons/Navigation/$1'],
        '^@common_spancategory/(.*)$': ['<rootDir>/src/modules/commons/SpanCategory/$1', '<rootDir>/core/modules/commons/SpanCategory/$1'],
        '^@common_span/(.*)$': ['<rootDir>/src/modules/commons/Span/$1', '<rootDir>/core/modules/commons/Span/$1'],
        '^@common_skeleton/(.*)$': ['<rootDir>/src/modules/commons/Skeleton/$1', '<rootDir>/core/modules/commons/Skeleton/$1'],
        '^@common_scrolltotop/(.*)$': ['<rootDir>/src/modules/commons/ScrollToTop/$1', '<rootDir>/core/modules/commons/ScrollToTop/$1'],
        '^@common_headermobile/(.*)$': [
            '<rootDir>/src/modules/theme/components/header/mobile/$1',
            '<rootDir>/core/modules/theme/components/header/mobile/$1',
        ],
        '^@common_headerdesktop/(.*)$': [
            '<rootDir>/src/modules/theme/components/header/desktop/$1',
            '<rootDir>/core/modules/theme/components/header/desktop/$1',
        ],
        '^@common_restrictionPopup/(.*)$': [
            '<rootDir>/src/modules/theme/components/restrictionPopup/$1',
            '<rootDir>/core/modules/theme/components/restrictionPopup/$1',
        ],
        '^@common_currency/(.*)$': ['<rootDir>/src/modules/setting/components/currency/$1', '<rootDir>/core/modules/setting/components/currency/$1'],
        '^@common_language/(.*)$': ['<rootDir>/src/modules/setting/components/language/$1', '<rootDir>/core/modules/setting/components/language/$1'],
        '^@common_bottomnavigation/(.*)$': [
            '<rootDir>/src/modules/theme/components/bottom-navigation/mobile/$1',
            '<rootDir>/core/modules/theme/components/bottom-navigation/mobile/$1',
        ],
        '^@common_footer/(.*)$': [
            '<rootDir>/src/modules/theme/components/footer/desktop/$1',
            '<rootDir>/core/modules/theme/components/footer/desktop/$1',
        ],
        '^@common_productlabel/(.*)$': ['<rootDir>/src/modules/commons/ProductLabel/$1', '<rootDir>/core/modules/commons/ProductLabel/$1'],
        '^@common_optionconfigurable/(.*)$': [
            '<rootDir>/src/modules/commons/OptionConfigurable/$1',
            '<rootDir>/core/modules/commons/OptionConfigurable/$1',
        ],

        '^@plugin_summary': ['<rootDir>/src/modules/cart/plugins/Summary', '<rootDir>/core/modules/cart/plugins/Summary'],
        '^@plugin_summary/(.*)$': ['<rootDir>/src/modules/cart/plugins/Summary/$1', '<rootDir>/core/modules/cart/plugins/Summary/$1'],
        '^@plugin_shoppingbag': ['<rootDir>/src/modules/cart/plugins/ShoppingBag', '<rootDir>/core/modules/cart/plugins/ShoppingBag'],
        '^@plugin_shoppingbag/(.*)$': ['<rootDir>/src/modules/cart/plugins/ShoppingBag/$1', '<rootDir>/core/modules/cart/plugins/ShoppingBag/$1'],
        '^@plugin_minicart': ['<rootDir>/src/modules/cart/plugins/mini', '<rootDir>/core/modules/cart/plugins/mini'],
        '^@plugin_minicart/(.*)$': ['<rootDir>/src/modules/cart/plugins/mini/$1', '<rootDir>/core/modules/cart/plugins/mini/$1'],

        '^@plugin_gimmickbanner': ['<rootDir>/src/modules/cart/plugins/GimmickBanner', '<rootDir>/core/modules/cart/plugins/GimmickBanner'],
        '^@plugin_gimmickbanner/(.*)$': [
            '<rootDir>/src/modules/cart/plugins/GimmickBanner/$1',
            '<rootDir>/core/modules/cart/plugins/GimmickBanner/$1',
        ],

        '^@plugin_productlist': ['<rootDir>/src/modules/catalog/plugins/ProductList', '<rootDir>/core/modules/catalog/plugins/ProductList'],
        '^@plugin_productlist/(.*)$': [
            '<rootDir>/src/modules/catalog/plugins/ProductList/$1',
            '<rootDir>/core/modules/catalog/plugins/ProductList/$1',
        ],
        '^@plugin_productitem': ['<rootDir>/src/modules/catalog/plugins/ProductItem', '<rootDir>/core/modules/catalog/plugins/ProductItem'],
        '^@plugin_productitem/(.*)$': [
            '<rootDir>/src/modules/catalog/plugins/ProductItem/$1',
            '<rootDir>/core/modules/catalog/plugins/ProductItem/$1',
        ],

        '^@plugin_paypalbutton': ['<rootDir>/src/modules/paypal/plugins/PaypalButton', '<rootDir>/core/modules/paypal/plugins/PaypalButton'],
        '^@plugin_paypalbutton/(.*)$': [
            '<rootDir>/src/modules/paypal/plugins/PaypalButton/$1',
            '<rootDir>/core/modules/paypal/plugins/PaypalButton/$1',
        ],

        '^@plugin_addressform': [
            '<rootDir>/src/modules/customer/plugins/AddressFormDialog',
            '<rootDir>/core/modules/customer/plugins/AddressFormDialog',
        ],
        '^@plugin_addressform/(.*)$': [
            '<rootDir>/src/modules/customer/plugins/AddressFormDialog/$1',
            '<rootDir>/core/modules/customer/plugins/AddressFormDialog/$1',
        ],
        '^@plugin_newsletter': ['<rootDir>/src/modules/customer/plugins/Newsletter', '<rootDir>/core/modules/customer/plugins/Newsletter'],
        '^@plugin_newsletter/(.*)$': [
            '<rootDir>/src/modules/customer/plugins/Newsletter/$1',
            '<rootDir>/core/modules/customer/plugins/Newsletter/$1',
        ],
        '^@plugin_otp': ['<rootDir>/src/modules/login/plugins/otp', '<rootDir>/core/modules/login/plugins/otp'],
        '^@plugin_otp/(.*)$': ['<rootDir>/src/modules/login/plugins/otp/$1', '<rootDir>/core/modules/login/plugins/otp/$1'],
        '^@plugin_notificationbell': [
            '<rootDir>/src/modules/notification/plugins/NotificationBell',
            '<rootDir>/core/modules/notification/plugins/NotificationBell',
        ],
        '^@plugin_notificationbell/(.*)$': [
            '<rootDir>/src/modules/notification/plugins/NotificationBell/$1',
            '<rootDir>/core/modules/notification/plugins/NotificationBell/$1',
        ],

        '^@plugin_optionitem': ['<rootDir>/src/modules/product/plugins/OptionItem', '<rootDir>/core/modules/product/plugins/OptionItem'],
        '^@plugin_optionitem/(.*)$': ['<rootDir>/src/modules/product/plugins/OptionItem/$1', '<rootDir>/core/modules/product/plugins/OptionItem/$1'],
        '^@plugin_customizableitem': [
            '<rootDir>/src/modules/product/plugins/CustomizableOption',
            '<rootDir>/core/modules/product/plugins/CustomizableOption',
        ],
        '^@plugin_customizableitem/(.*)$': [
            '<rootDir>/src/modules/product/plugins/CustomizableOption/$1',
            '<rootDir>/core/modules/product/plugins/CustomizableOption/$1',
        ],
        '^@plugin_rewardpointinfo': ['<rootDir>/src/modules/rewardpoint/plugins/info', '<rootDir>/core/modules/rewardpoint/plugins/info'],
        '^@plugin_rewardpointinfo/(.*)$': ['<rootDir>/src/modules/rewardpoint/plugins/info/$1', '<rootDir>/core/modules/rewardpoint/plugins/info/$1'],
    },
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    testEnvironment: 'jsdom',
    transform: {
        // Use babel-jest to transpile tests with the next/babel preset
        // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
