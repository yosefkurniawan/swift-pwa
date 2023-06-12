import Image from '@common_image';
import useStyles from '@core_modules/cms/components/cms-renderer/image-renderer/style';
import { strToCSSObject } from '@helpers/text';
import { generateThumborUrl } from '@root/core/helpers/image';
import classNames from 'classnames';

const ImageRenderer = (props) => {
    const { domNode, storeConfig } = props;
    const {
        src = '', alt = '', style = '', ...attribs
    } = domNode.attribs;
    const classes = useStyles({ width: attribs.width, height: attribs.height });

    if (!domNode.attribs.src.includes('thumbor')) {
        const optImg = generateThumborUrl(src, 0, 0, true, false, storeConfig.pwa.thumbor_url);

        return (
            <Image
                className={classNames(attribs.class, classes.image)}
                classContainer={classes.container}
                src={optImg}
                alt={alt ?? 'image'}
                width={attribs.width ? attribs.width.replace('px', '') : 0}
                height={attribs.height ? attribs.height.replace('px', '') : 0}
                storeConfig={storeConfig}
            />
        );
    }

    return <img src={src} alt={alt ?? 'image'} style={strToCSSObject(style)} {...attribs} />;
};

export default ImageRenderer;
