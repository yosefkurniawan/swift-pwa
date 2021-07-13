import { useEffect } from 'react';

const TwitterTimeline = (props) => {
    const {
        box_height, box_width, limit, theme, page_url, chrome, show_replies,
    } = props;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            /* eslint-disable */
            window.twttr = (function (d, s, id) {
                let js,
                    fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function (f) {
                    t._e.push(f);
                };

                return t;
            })(document, 'script', 'twitter-wjs');
        }
    }, []);

    return (
        <>
            <a
                className="twitter-timeline"
                data-width={box_width}
                data-height={box_height}
                data-theme={theme}
                data-tweet-limit={limit}
                data-chrome={chrome}
                show-replies={show_replies}
                href={`https://twitter.com/${page_url}?ref_src=twsrc%5Etfw`}
            >
                Tweets by TwitterDev
                {/* ${} */}
            </a>
        </>
    );
};

export default TwitterTimeline;
