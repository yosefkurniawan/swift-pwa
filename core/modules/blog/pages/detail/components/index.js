import Body from '@core_modules/blog/components/Details';
import Category from '@core_modules/blog/components/Category';
import RelatedProduct from '@core_modules/blog/components/RelatedProduct';
import { DiscussionEmbed } from 'disqus-react';
import { getHost } from '@helpers/config';

const DefaultContent = (props) => {
    const {
        storeConfig, title, url_key, relatedProduct, isUnderPost = true, t,
        limitProduct = 8,
    } = props;
    const url = typeof window !== 'undefined'
        ? window.location.href
        : `${getHost()}/blog/${url_key}`;

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-2 hidden-mobile">
                <Category {...props} />
            </div>
            <div className="col-xs-12 col-sm-10 row">
                <div className="col-xs-12 col-md-12">
                    <Body {...props} />
                </div>
                <div className={isUnderPost ? 'col-xs-12 col-md-12' : 'hidden'}>
                    <RelatedProduct relatedProduct={relatedProduct.slice(0, limitProduct)} t={t} storeConfig={storeConfig} />
                </div>
                <div className="col-xs-12 col-md-12 comment-container">
                    {
                        storeConfig.aw_blog_general_comments_enabled && (
                            <DiscussionEmbed
                                shortname={storeConfig.aw_blog_general_disqus_forum_code}
                                config={
                                    {
                                        url,
                                        identifier: url_key,
                                        title,
                                    }
                                }
                            />
                        )
                    }
                </div>
                <div className={isUnderPost ? 'hidden' : 'col-xs-12 col-md-12'}>
                    <RelatedProduct relatedProduct={relatedProduct.slice(0, limitProduct)} t={t} storeConfig={storeConfig} />
                </div>
            </div>
            <style jsx>
                {`
                    .comment-container {
                        padding: 10px 10px 10px 20px;
                    }
                    .hidden {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};

export default DefaultContent;
