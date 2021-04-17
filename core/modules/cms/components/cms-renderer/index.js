/* eslint-disable consistent-return */
import React, { memo } from 'react';
import parse from 'html-react-parser';
import WidgetPwaLink from './widget-link-pwa';
import WidgetListProduct from './widget-list-product';
import WidgetListBrand from './widget-list-brand';
import WidgetInstagram from './widget-instagram';
import WidgetSlider from './widget-slider';
import WidgetView from './view';

const TYPE_PAGE = 'page';

const TYPE_PWA_SLIDER = 'pwa-slider';
const TYPE_PWA_FEATURED = 'pwa-featured-brands';
const TYPE_PWA_INSTAGRAM = 'pwa-instagram';
const TYPE_PWA_PAGELINK = 'pwa-cms-page-link';
const TYPE_PWA_PRODUCT = 'pwa-catalog-products-list';

const DOM_NAME = 'pwa';

const CmsRenderer = (props) => {
    const { type, content, storeConfig } = props;

    React.useEffect(() => {
        setTimeout(() => {
            const coll = document.getElementsByClassName('collapsible');
            if (coll[0]) {
                coll[0].classList.toggle('active');
                const contentCMS = coll[0].nextElementSibling;
                if (contentCMS.style.maxHeight) {
                    contentCMS.style.maxHeight = null;
                } else {
                    contentCMS.style.maxHeight = `${contentCMS.scrollHeight}px`;
                }
            }
        }, 1000);
    });

    const onCollapseCMS = () => {
        const coll = document.getElementsByClassName('collapsible');
        let i;
        /* eslint-disable */
        for (i = 0; i < coll.length; i += 1) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var contentCMS = this.nextElementSibling;
                if (contentCMS.style.maxHeight) {
                    contentCMS.style.maxHeight = null;
                } else {
                    contentCMS.style.maxHeight = contentCMS.scrollHeight + "px";
                }
            });
        }
        /* eslint-enable */
    };
    /**
     * component conversion
     * NOTES*: validateDOMNesting(...): <div> cannot appear as a descendant of <p>
     * parent cms page || block must start with <div>
     * @returns {COMPONENT}
     */
    /* eslint-disable */
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

                    if (domNode.attribs) {
                        if (domNode.attribs.class === 'acctitle') {
                            return (
                                <button
                                    type="button"
                                    onClick={() => onCollapseCMS()}
                                    className="collapsible"
                                >
                                    {domToReact(domNode.children, domNode)}
                                </button>
                            );
                        }

                        if (domNode.attribs.class === 'acc_content clearfix') {
                            return (
                                <div className="content-collapsible">
                                    {domToReact(domNode.children, domNode)}
                                </div>
                            )
                        }

                        return null;
                    }
                },
            });
        }
    };
    /* eslint-enable */

    /**
     * other props
     */
    const propsOther = { WidgetComponent };

    return <WidgetView {...props} {...propsOther} />;
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.content;

export default memo(CmsRenderer, notRenderIf);
