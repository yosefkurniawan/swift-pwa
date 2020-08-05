/* eslint-disable react/no-danger */
const SocialView = (props) => {
    const { data } = props;
    return (
        <>
            <style jsx>
                {`
                    .cms-container {
                        text-align: center;
                        padding: 48px;
                        font-size: 24px;
                    }
                    .cms-container :global(.social-media-links) {
                        display: inline-block;
                        background-color: #f2f2f2;
                        padding: 8px 12px;
                        border-radius: 8px;
                    }
                    .cms-container :global(.social-icon) {
                        padding: 0 6px;
                        vertical-align: middle;
                        display: inline-block;
                    }
                    .cms-container :global(.social-icon i:before){
                        content: '';
                        background-position: center;
                        background-size: contain;
                        width: 40px;
                        height: 40px;
                        display: block;
                    }
                    .cms-container :global(.social-icon .icon-facebook:before){
                        background-image: url(/assets/img/facebook.png);
                    }
                    .cms-container :global(.social-icon .icon-twitter:before){
                        background-image: url(/assets/img/twitter.png);
                    }
                    .cms-container :global(.social-icon .icon-instagram:before){
                        background-image: url(/assets/img/instagram.png);
                    }
                    .cms-container :global(.social-icon .icon-pinterest:before){
                        background-image: url(/assets/img/pinterest.png);
                    }
                `}
            </style>
            <div
                className="cms-container"
                dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }}
            />
        </>
    );
};

export default SocialView;
