/* eslint-disable consistent-return */
import React, { memo } from 'react';
import parse from 'html-react-parser';
import WidgetPwaLink from './link-pwa';
import WidgetListProduct from './list-product';
import WidgetListBrand from './list-brand';
import WidgetInstagram from './instagram';
import WidgetSlider from './slider';
import WidgetView from './view';

const TYPE_PAGE = 'page';

const TYPE_PWA_SLIDER = 'pwa-slider';
const TYPE_PWA_FEATURED = 'pwa-featured-brands';
const TYPE_PWA_INSTAGRAM = 'pwa-instagram';
const TYPE_PWA_PAGELINK = 'pwa-cms-page-link';
const TYPE_PWA_PRODUCT = 'pwa-catalog-products-list';

const DOM_NAME = 'pwa';

const Widget = (props) => {
    const { type, content, storeConfig } = props;

    /**
     * component conversion
     * NOTES*: validateDOMNesting(...): <div> cannot appear as a descendant of <p>
     * parent cms page || block must start with <div>
     * @returns {COMPONENT}
     */
    const WidgetComponent = () => {
        if (type === TYPE_PAGE) {
            return parse(content, {
                replace: (domNode) => {
                    if (domNode.name === DOM_NAME && domNode.attribs) {
                        const propsWidget = domNode.attribs;
                        switch (domNode.attribs.type) {
                        case TYPE_PWA_SLIDER:
                            return <WidgetSlider {...propsWidget} storeConfig={storeConfig} />;
                        case TYPE_PWA_FEATURED:
                            return <WidgetListBrand {...propsWidget} />;
                        case TYPE_PWA_INSTAGRAM:
                            return <WidgetInstagram {...propsWidget} />;
                        case TYPE_PWA_PAGELINK:
                            return <WidgetPwaLink {...propsWidget} />;
                        case TYPE_PWA_PRODUCT:
                            return <WidgetListProduct {...propsWidget} />;
                        default:
                            return <div>Unable to render the content!</div>;
                        }
                    }
                },
            });
        }
    };

    /**
     * other props
     */
    const propsOther = { WidgetComponent };

    return <WidgetView {...props} {...propsOther} />;
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.content;

export default memo(Widget, notRenderIf);
