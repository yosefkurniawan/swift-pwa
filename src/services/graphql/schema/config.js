/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const storeConfig = gql`
    {
        storeConfig {
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
            default_keywords
            default_description
            default_display_currency_code
            header_logo_src
            head_shortcut_icon
            icube_pinlocation_gmap_key
            logo_alt
            logo_width
            logo_height
            store_name
            welcome
            timezone
            title_prefix
            title_suffix
            title_separator
            website_id
            weight_unit
            oauth_access_token_lifetime_customer
            payments_configuration
            snap_client_key
            snap_is_production
            aw_blog_general_enabled
        }
    }
`;

export const otpConfig = gql`
    {
        otpConfig {
            otp_enable {
                enable_otp_forgot_password
                enable_otp_login
                enable_otp_register
            }
            otp_expired_time {
                expired_time_otp_forgot_password
                expired_time_otp_login
                expired_time_otp_register
            }
            otp_general_email_required
            otp_length {
                length_otp_forgot_password
                length_otp_login
                length_otp_register
            }
            otp_max_try {
                max_try_otp_forgot_password
                max_try_otp_login
                max_try_otp_register
            }
        }
    }
`;
