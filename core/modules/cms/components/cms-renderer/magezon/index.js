/* eslint-disable max-len */
import React from 'react';
import MagezonSlider from '@core_modules/cms/components/cms-renderer/magezon/MagezonSlider';
import generateCustomCssAnimation from '@core_modules/cms/helpers/magezonCustomCssAnimationGenerator';
import dynamic from 'next/dynamic';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import 'animate.css';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonCaraousel = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonCaraousel'), { ssr: false });
const MagezonColumn = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonColumn'));
const MagezonRow = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonRow'));
const MagezonHeading = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonHeading'));
const MagezonSingleImage = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage'));
const MagezonText = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonText'));
const MagezonButton = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonButton'));
const MagezonRawHtml = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonRawHtml'), { ssr: false });
const MagezonWidget = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonWidget'), { ssr: false });
const MagezonIcon = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon'), { ssr: false });
const MagezonIconList = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonIconList'), { ssr: false });
const MagezonSeparator = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSeparator'), { ssr: false });
const MagezonEmpty = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonEmpty'), { ssr: false });
const MagezonFanspage = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonFanspage'), { ssr: false });
const MagezonToggle = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonToggle'), { ssr: false });
const MagezonFlipBox = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonFlipBox'), { ssr: false });
const MagezonCounter = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/index'), { ssr: false });
const MagezonMessageBox = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonMessageBox'), { ssr: false });
const MagezonNewsletter = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonNewsletter'), { ssr: false });
const MagezonContactForm = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonContactForm'), { ssr: false });
const MagezonCta = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonCta'), { ssr: false });
const MagezonSearchForm = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSearchForm'), { ssr: false });
const MagezonStaticBlock = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonStaticBlock'));
const MagezonPagebuilderTemplate = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonPageBuilderTemplate'), { ssr: false });
const MagezonVideoPlayer = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonVideoPlayer'), { ssr: false });
const MagezonPricingTable = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonPricingTable'), { ssr: false });
const MagezonImageGallery = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonImageGallery'), { ssr: false });
const MagezonCategories = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonCategories'), { ssr: false });
const MagezonContentSlider = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonContentSlider'), { ssr: false });
const MagezonTestimonials = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonTestimonials'), { ssr: false });
const MagezonRecentReviews = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonRecentReviews'), { ssr: false });
const MagezonGoogleMaps = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonGoogleMaps'), { ssr: false });
const MagezonProgressBar = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonProgressBar'), { ssr: false });
const MagezonAccordion = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonAccordion'), { ssr: false });
const MagezonSection = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSection'), { ssr: false });
const MagezonPageableContainer = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonPageableContainer'), { ssr: false });
const MagezonProduct = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonProduct'));

const MagezonInstagram = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed'), { ssr: false });
const MagezonPinterest = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonPinterest'), { ssr: false });
const MagezonTwitter = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonTwitter'), { ssr: false });
const MagezonParallax = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonParallax'), { ssr: false });
const MagezonFlickr = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonFlickr'), { ssr: false });
const MagezonCountdown = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonCountdown'), { ssr: false });
const MagezonSocialIcons = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonSocialIcons'), { ssr: false });
const MagezonTabs = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonTabs'), { ssr: false });

const MagezonElement = (props) => {
    const {
        type, content,
        animation_in, animation_duration, animation_delay, animation_infinite,
        parallax_type, parallax_speed,
        mouse_parallax, mouse_parallax_size, mouse_parallax_speed,
        background_image, background_color, full_height,
        xs_hide, sm_hide, md_hide, lg_hide, xl_hide,
        hidden_default, disable_element, el_class, el_id, el_inner_class,
        storeConfig,
    } = props;
    const { base_media_url } = storeConfig;
    const customStyles = useStyles();
    let childrenContent;
    let classes = `${customStyles.wrapper} mgz-element `;
    let customId = '';
    let innerClasses = 'mgz-element-inner ';
    const { className, styles } = generateCustomCssAnimation(animation_duration, animation_delay, animation_infinite);
    const enumCustomAnimation = {
        topToBottom: 'mgz_top-to-bottom',
        bottomToTop: 'mgz_bottom-to-top',
        leftToRight: 'mgz_left-to-right',
        rightToLeft: 'mgz_right-to-left',
        appear: 'mgz_appear',
        backSlideIn: 'owl-backSlide-in',
        fadeUpIn: 'owl-fadeUp-in',
        goDownIn: 'owl-goDown-in',
    };

    if (el_class) {
        classes += `${el_class}`;
    }

    if (el_id) {
        customId += `${el_id}`;
    }

    if (el_inner_class) {
        innerClasses += `${el_inner_class}`;
    }

    if (full_height) {
        classes += 'full_height ';
    }

    if (disable_element) return null;

    if (xs_hide) classes += 'xs-hide ';
    if (sm_hide) classes += 'sm-hide ';
    if (md_hide) classes += 'md-hide ';
    if (lg_hide) classes += 'lg-hide ';
    if (xl_hide) classes += 'xl-hide ';

    if (hidden_default) classes += 'hidden-default ';

    if (animation_in) {
        if (!Object.values(enumCustomAnimation).includes(animation_in)) {
            // base CSS animation using animate.css class and utility class
            classes += `animate__animated animate__${animation_in}`;
            if (animation_delay) {
                classes += ` animate__delay-${animation_delay}s`;
            }
            if (animation_infinite) {
                classes += ' animate__infinite';
            }
            if (animation_duration) {
                classes += ' animation_duration';
            }
        } else {
            // custom CSS animation
            classes += `${animation_in} ${className}`;
            if (animation_duration || animation_delay || animation_infinite) {
                classes += ' custom_animation';
            }
        }
    }

    React.useEffect(() => {
        if (type && type === 'raw_js' && content && content !== '' && content.includes('<script>')) {
            if (typeof window !== 'undefined') {
                let code = content.replace('<script>', '');
                code = code.replace('</script>', '');
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.innerHTML = code;
                document.body.appendChild(script);
            }
        }
    }, [props]);

    if (type) {
        switch (type) {
        case 'row':
            childrenContent = <MagezonRow {...props} />; break;
        case 'column':
            childrenContent = <MagezonColumn {...props} />; break;
        case 'heading':
            childrenContent = <MagezonHeading {...props} />; break;
        case 'single_image':
            childrenContent = <MagezonSingleImage {...props} />; break;
        case 'text':
            childrenContent = <MagezonText {...props} />; break;
        case 'button':
            childrenContent = <MagezonButton {...props} />; break;
        case 'raw_html':
            childrenContent = <MagezonRawHtml {...props} />; break;
        case 'magento_widget':
            childrenContent = <MagezonWidget {...props} />; break;
        case 'instagram':
            childrenContent = <MagezonInstagram {...props} />; break;
        case 'pinterest':
            childrenContent = <MagezonPinterest {...props} />; break;
        case 'twitter_button':
            childrenContent = <MagezonTwitter {...props} />; break;
        case 'twitter_timeline':
            childrenContent = <MagezonTwitter {...props} />; break;
        case 'icon':
            childrenContent = <MagezonIcon {...props} />; break;
        case 'icon_list':
            childrenContent = <MagezonIconList {...props} />; break;
        case 'separator':
            childrenContent = <MagezonSeparator {...props} />; break;
        case 'empty_space':
            childrenContent = <MagezonEmpty {...props} />; break;
        case 'facebook_page':
            childrenContent = <MagezonFanspage {...props} />; break;
        case 'facebook_comments':
            childrenContent = <MagezonFanspage {...props} />; break;
        case 'facebook_like':
            childrenContent = <MagezonFanspage {...props} />; break;
        case 'toggle':
            childrenContent = <MagezonToggle {...props} />; break;
        case 'number_counter':
            childrenContent = <MagezonCounter {...props} />; break;
        case 'message_box':
            childrenContent = <MagezonMessageBox {...props} />; break;
        case 'newsletter_form':
            childrenContent = <MagezonNewsletter {...props} />; break;
        case 'contact_form':
            childrenContent = <MagezonContactForm {...props} />; break;
        case 'flip_box':
            childrenContent = <MagezonFlipBox {...props} />; break;
        case 'static_block':
            childrenContent = <MagezonStaticBlock {...props} />; break;
        case 'flickr':
            childrenContent = <MagezonFlickr {...props} />; break;
        case 'call_to_action':
            childrenContent = <MagezonCta {...props} />; break;
        case 'countdown':
            childrenContent = <MagezonCountdown {...props} />; break;
        case 'slider':
            childrenContent = <MagezonSlider {...props} />; break;
        case 'image_carousel':
            childrenContent = <MagezonCaraousel {...props} />; break;
        case 'search_form':
            childrenContent = <MagezonSearchForm {...props} />; break;
        case 'social_icons':
            childrenContent = <MagezonSocialIcons {...props} />; break;
        case 'pagebuilder_template':
            childrenContent = <MagezonPagebuilderTemplate {...props} />; break;
        case 'video':
            childrenContent = <MagezonVideoPlayer {...props} />; break;
        case 'pricing_table':
            childrenContent = <MagezonPricingTable {...props} />; break;
        case 'image_gallery':
            childrenContent = <MagezonImageGallery {...props} />; break;
        case 'categories':
            childrenContent = <MagezonCategories {...props} />; break;
        case 'content_slider':
            childrenContent = <MagezonContentSlider {...props} />; break;
        case 'recent_reviews':
            childrenContent = <MagezonRecentReviews {...props} />; break;
        case 'single_product':
            childrenContent = <MagezonProduct {...props} />; break;
        case 'product_list':
            childrenContent = <MagezonProduct {...props} />; break;
        case 'product_grid':
            childrenContent = <MagezonProduct {...props} />; break;
        case 'product_slider':
            childrenContent = <MagezonProduct {...props} />; break;
        case 'testimonials':
            childrenContent = <MagezonTestimonials {...props} />; break;
        case 'gmaps':
            childrenContent = <MagezonGoogleMaps {...props} />; break;
        case 'progress_bar':
            childrenContent = <MagezonProgressBar {...props} />; break;
        case 'section':
            childrenContent = <MagezonSection {...props} />; break;
        case 'accordion':
            childrenContent = <MagezonAccordion {...props} />; break;
        case 'pageable_container':
            childrenContent = <MagezonPageableContainer {...props} />; break;
        case 'tabs':
            childrenContent = <MagezonTabs {...props} />; break;
        default:
            childrenContent = null;
        }
    }

    return (
        <>
            <div className={classes} id={customId || null}>
                <div className={innerClasses}>
                    {background_image && (
                        <>
                            <div className="parallax-wrapper mouse-parallax">
                                <MagezonParallax
                                    src={`${base_media_url}${background_image}`}
                                    speed={parallax_speed}
                                    type={parallax_type}
                                    mouseParallax={mouse_parallax}
                                    mouseSize={mouse_parallax_size}
                                />
                            </div>
                        </>
                    )}
                    {childrenContent}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-element {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        ${background_color ? `background-color: ${background_color};` : ''}
                    }
                    @media screen and (max-width: 360px) {
                        .full_height {
                            min-height: ${Math.round(storeConfig.pwa.magezon_slider_mobile_width * 0.8)}px;
                        }
                    }
                    @media screen and (min-width: 361px) and (max-width: 383px) {
                        .full_height {
                            min-height: ${Math.round(storeConfig.pwa.magezon_slider_mobile_width * 0.9)}px;
                        }
                    }
                    @media screen and (min-width: 384px) and (max-width: 479px) {
                        .full_height {
                            min-height: ${Math.round(storeConfig.pwa.magezon_slider_mobile_width * 0.95)}px;
                        }
                    }
                    @media screen and (min-width: 480px) and (max-width: 767px) {
                        .full_height {
                            min-height: ${Math.round(storeConfig.pwa.magezon_slider_mobile_width * 1.25)}px;
                        }
                    }
                    @media screen and (min-width: 768px) and (max-width: 800px) {
                        .full_height {
                            min-height: ${storeConfig.pwa.magezon_slider_mobile_height}px;
                        }
                    }
                    @media screen and (min-width: 801px) {
                        .full_height {
                            min-height: 433px;
                        }
                    }
                    .hidden-default {
                        display: none;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-column > * {
                        padding: 0px;
                    }

                    @media screen and (min-width: 768px) {
                        .mgz-element:not(.full_height) > .mgz-element-inner >.row > .mgz-column > * {
                            padding: 10px;
                        }
                    }

                    @media screen and (max-width: 768px) {
                        .mgz-element.full_height > .mgz-element-inner >  .row > .mgz-column > .mgz-element {
                            margin-top: -15px;
                            position: absolute;
                        }

                        .mgz-element > .mgz-element-inner > div > p {
                            margin: 0px !important;
                            padding: 0px !important;
                        }
                    }

                    @media screen and (min-width: 1200px) {
                        .mgz-element.full_height > .mgz-element-inner > .row > .mgz-column > .mgz-element {
                            padding-top: 0px !important;
                            padding-left: 0px !important;
                            padding-right: 0px !important;
                            padding-bottom: 0px !important
                        }
                    }

                    .animation_duration {
                        --animate-duration: ${animation_duration || 0.5}s;
                    }
                    .parallax-wrapper {
                        border-radius: inherit;
                        position: absolute;
                        top: 0;AAA
                        bottom: 0;
                        right: 0;
                        left: 0;
                        overflow: hidden;
                        // pointer-events: none;
                    }
                    .parallax-wrapper * {
                        position: absolute;
                    }
                    .parallax-wrapper.mouse-parallax {
                        transform: translateX(0);
                    }
                    .jarallax {
                        inset: -${mouse_parallax_size}px;
                        transition: transform ${mouse_parallax_speed}ms cubic-bezier(0.22, 0.63, 0.6, 0.88) 0s;

                        background-image: none;
                        background-size: auto;
                        background-position: center top;
                        background-repeat: no-repeat;
                    }
                    .jarallax * {
                        background-size: inherit !important;
                        background-position: inherit !important;
                        background-repeat: inherit !important;
                    }
                `}
            </style>
            {styles}
        </>
    );
};

export default MagezonElement;
