import Body from '@core_modules/blog/components/Details';
import Category from '@core_modules/blog/components/Category';
import { DiscussionEmbed } from 'disqus-react';
import { getHost } from '@helpers/config';

const DefaultContent = (props) => {
    const { storeConfig, title, url_key } = props;
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
            </div>
            <style jsx>
                {`
                    .comment-container {
                        padding: 10px 10px 10px 20px;
                    }
                `}
            </style>
        </div>
    );
};

export default DefaultContent;
