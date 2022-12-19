#! /usr/bin/env node
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');
const { GraphQLClient, gql } = require('graphql-request');
const { graphqlEndpoint } = require('../../../../swift.config');
const { getAppEnv, getAccessEnv, getEncryptEnv } = require('../../../helpers/env');

const { generateSetting } = require('../setting/generatesetting');

const baseDir = path.join(__dirname, '../config/');

const appEnv = getAppEnv();

const graphQLClient = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${getAccessEnv()}`,
        'Content-Type': 'application/json',
    },
    jsonSerializer: {
        parse: JSON.parse,
        stringify: JSON.stringify,
    },
});

const reqBody = gql`{
    storeConfig {
    cms_page
    pwa {
        use_cms_page_enable
        use_cms_page_identifier
        banner_slider_enable
        banner_slider_title
        category_list_enable
        category_list_url_key            
        category_list_image_size_desktop_height
        category_list_image_size_desktop_width
        category_list_image_size_mobile_height
        category_list_image_size_mobile_width
        features_product_enable
        features_product_url_key
        use_cms_page_enable
        use_cms_page_identifier
        banner_slider_enable
        banner_slider_title
        category_list_enable
        category_list_url_key            
        category_list_image_size_desktop_height
        category_list_image_size_desktop_width
        category_list_image_size_mobile_height
        category_list_image_size_mobile_width
        features_product_enable
        features_product_url_key
        add_to_cart_enable
        app_name
        cms_contact_identifiers
        cms_social_media_link_identifer
        configurable_options_enable
        custom_install_app_enable
        default_robot
        drawer_filter_on_desktop_enable
        enabler_footer_mobile
        enabler_sticky_header
        facebook_app_id
        facebook_meta_id_app_id
        facebook_meta_id_enable
        footer_version
        header_version
        home_slider_desktop_height
        home_slider_desktop_width
        home_slider_mobile_height
        home_slider_mobile_width
        icon_apple_touch
        image_category_height
        image_category_width
        image_product_height
        image_product_width
        thumbor_enable
        thumbor_https_http
        thumbor_url
        install_message
        label_enable
        label_new_enable
        label_sale_enable
        label_weltpixel_enable
        magezon_slider_desktop_height
        magezon_slider_desktop_width
        magezon_slider_mobile_height
        magezon_slider_mobile_width
        mobile_navigation
        page_size
        paypal_debug
        paypal_enable
        paypal_merchant_id
        popup_detail_image_enable
        promo_banner_lite_after_width
        promo_banner_lite_label_width
        promo_banner_lite_top_width
        quick_view_enable
        rating_enable
        recaptcha_contact_enable
        recaptcha_enable
        recaptcha_login_enable
        recaptcha_register_enable
        recaptcha_server_key_dev
        recaptcha_server_key_local
        recaptcha_server_key_prod
        recaptcha_server_key_stage
        recaptcha_site_key_dev
        recaptcha_site_key_local
        recaptcha_site_key_prod
        recaptcha_site_key_stage
        remove_decimal_price_enable
        share_icon_email
        share_icon_facebook
        share_icon_line
        share_icon_linkedin
        share_icon_pinterest
        share_icon_telegram
        share_icon_twitter
        ves_menu_alias
        ves_menu_enable
        ves_menu_enable
        primary_color
        secondary_color
        background_color
        error_color
        warning_msg_color
        success_msg_color
        font_color
        default_font
        heading_font
        button_background_color
        button_background_hover_color
        button_disabled_background_color
        button_text_color
        button_text_hover_color
        button_disabled_text_color
        button_border_color
        button_border_hover_color
        link_color
        link_hover_color
        link_font_decoration
        link_font_hover_decoration
    }
    secure_base_media_url
    secure_base_static_url
    customer_password_minimum_password_length
    customer_password_required_character_classes_number
    base_media_url
    base_static_url
    base_url
    base_currency_code
    code
    catalog_search_engine
    copyright
    catalog_default_sort_by
    category_url_suffix
    default_title
    enable_oms_multiseller
    default_keywords
    default_description
    default_display_currency_code
    date_of_birth
    gender
    general_country_default
    header_logo_src
    head_shortcut_icon
    icube_pinlocation_gmap_key
    icube_pinlocation_geocoding_key
    locale
    logo_alt
    logo_width
    logo_height
    shipments_configuration
    payments_configuration
    store_name
    welcome
    timezone
    title_prefix
    title_suffix
    title_separator
    website_id
    weight_unit
    oauth_access_token_lifetime_customer
    pwa_checkout_debug_enable
    snap_client_key
    stripe_config {
        stripe_mode
        test_pk
        live_pk
    }
    paypal_key {
        cancel_url
        client_id
        client_secret
        disable_funding
        intent
        key_data
        key_token
        path
        return_url
    }
    allow_guest_checkout
    snap_is_production
    aw_blog_general_enabled
    pickup_store
    cookie_restriction
    login_phone_password
    forgot_password_phone
    global_promo {
        enable
        text_color
        background_color
    }
    weltpixel_newsletter_general_enable
    weltpixel_newsletter_general_version
    weltpixel_newsletter_general_overlay_color
    weltpixel_newsletter_general_overlay_opacity
    weltpixel_newsletter_general_display_mode
    weltpixel_newsletter_general_display_mobile
    weltpixel_newsletter_general_mobile_version
    weltpixel_newsletter_general_popup_cookie_lifetime
    weltpixel_newsletter_general_terms_conditions_consent
    weltpixel_newsletter_general_terms_conditions_text
    weltpixel_newsletter_general_enable_trigger_button
    weltpixel_newsletter_general_trigger_button_title
    weltpixel_newsletter_general_trigger_button_color
    weltpixel_newsletter_general_trigger_button_backgroundcolor
    aw_blog_general_comments_enabled
    aw_blog_general_disqus_forum_code
    aw_blog_related_products_block_layout
    aw_blog_related_products_block_position
    aw_blog_related_products_products_limit
    aw_blog_related_products_display_add_to_cart
    weltpixel_RecentlyViewedBar_general_enable
    weltpixel_thankyoupage_create_account_enable
    payment_travelokapay_public_key
    payment_travelokapay_user_id
    payment_travelokapay_bin_whitelist
    pin_location_latitude
    pin_location_longitude
    minimum_order_amount
    minimum_order_enable
    OmsRma {
        enable_oms_rma
        enable_oms_pwa_request_return
        oms_rma_link
    }
    oms_channel_code
    }
}`;

const generateConfig = async (req, res) => {
    if (`Bearer ${getEncryptEnv()}` == req.headers.authorization) {
        graphQLClient.request(reqBody, {}).then(async (data) => {
            fs.writeFile(`${baseDir}config.json`, JSON.stringify(data), (err) => {
                if (err) throw err;
            });
            res.send(data);
            await generateSetting();
        }).catch((err) => {
            res.status(500).json(err);
            // eslint-disable-next-line no-console
            console.log('generate config failed', err);
        });
    } else {
        res.status(403).json({ message: 'Token Invalid' });
    }
};

module.exports = generateConfig;
