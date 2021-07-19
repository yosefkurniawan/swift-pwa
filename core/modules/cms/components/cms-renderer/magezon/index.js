import React from 'react';
import MagezonColumn from '@core_modules/cms/components/cms-renderer/magezon/MagezonColumn';
import MagezonRow from '@core_modules/cms/components/cms-renderer/magezon/MagezonRow';
import MagezonHeading from '@core_modules/cms/components/cms-renderer/magezon/MagezonHeading';
import MagezonSingleImage from '@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage';
import MagezonText from '@core_modules/cms/components/cms-renderer/magezon/MagezonText';
import MagezonButton from '@core_modules/cms/components/cms-renderer/magezon/MagezonButton';
import MagezonRawHtml from '@core_modules/cms/components/cms-renderer/magezon/MagezonRawHtml';
import MagezonWidget from '@core_modules/cms/components/cms-renderer/magezon/MagezonWidget';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import MagezonFanspage from '@core_modules/cms/components/cms-renderer/magezon/MagezonFanspage';
import generateCustomCssAnimation from '@core_modules/cms/helpers/magezonCustomCssAnimationGenerator';
import dynamic from 'next/dynamic';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css';

const MagezonInstagram = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed'), { ssr: false });
const MagezonPinterest = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonPinterest'), { ssr: false });
const MagezonTwitter = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonTwitter'), { ssr: false });

const MagezonElement = (props) => {
    const {
        type, content,
        animation_in, animation_duration, animation_delay, animation_infinite,
    } = props;
    let childrenContent;
    let classes = '';
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
        case 'facebook_page':
            childrenContent = <MagezonFanspage {...props} />; break;
        case 'facebook_comments':
            childrenContent = <MagezonFanspage {...props} />; break;
        case 'facebook_like':
            childrenContent = <MagezonFanspage {...props} />; break;
        default:
            childrenContent = null;
        }
    }

    return (
        <>
            <div className={classes}>
                {childrenContent}
            </div>
            <style jsx>
                {`
                    .animation_duration {
                        --animate-duration: ${animation_duration || 0.5}s;
                    }
                `}
            </style>
            {styles}
        </>
    );
};

export default MagezonElement;
