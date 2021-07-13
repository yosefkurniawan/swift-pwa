import React from 'react';
import MagezonColumn from '@core_modules/cms/components/cms-renderer/magezon/MagezonColumn';
import MagezonRow from '@core_modules/cms/components/cms-renderer/magezon/MagezonRow';
import MagezonHeading from '@core_modules/cms/components/cms-renderer/magezon/MagezonHeading';
import MagezonSingleImage from '@core_modules/cms/components/cms-renderer/magezon/MagezonSingleImage';
import MagezonText from '@core_modules/cms/components/cms-renderer/magezon/MagezonText';
import MagezonButton from '@core_modules/cms/components/cms-renderer/magezon/MagezonButton';
import MagezonRawHtml from '@core_modules/cms/components/cms-renderer/magezon/MagezonRawHtml';
import MagezonWidget from '@core_modules/cms/components/cms-renderer/magezon/MagezonWidget';
import dynamic from 'next/dynamic';

const MagezonInstagram = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed'), { ssr: false });
const MagezonPinterest = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonPinterest'), { ssr: false });

const MagezonElement = (props) => {
    const { type, content } = props;

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
            return <MagezonRow {...props} />;
        case 'column':
            return <MagezonColumn {...props} />;
        case 'heading':
            return <MagezonHeading {...props} />;
        case 'single_image':
            return <MagezonSingleImage {...props} />;
        case 'text':
            return <MagezonText {...props} />;
        case 'button':
            return <MagezonButton {...props} />;
        case 'raw_html':
            return <MagezonRawHtml {...props} />;
        case 'magento_widget':
            return <MagezonWidget {...props} />;
        case 'instagram':
            return <MagezonInstagram {...props} />;
        case 'pinterest':
            return <MagezonPinterest {...props} />;

        default:
            return null;
        }
    }

    return null;
};

export default MagezonElement;
