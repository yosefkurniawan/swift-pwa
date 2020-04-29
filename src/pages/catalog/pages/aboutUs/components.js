import Loading from '@components/Loaders';
import { getCmsPage } from './services/graphql';

const AboutUsPage = () => {
    const { error, loading, data } = getCmsPage({ identifier: 'about-us' });
    if (error) return <p>error</p>;
    if (loading) return <Loading size="40px" />;

    return (
        <>
            <style>
                {`
                    .cms-container {
                        padding: 0 16px;
                        text-align: justify;
                    }
                    .cms-content-important {
                        background: #f5f5f5;
                        padding: 16px;
                        border-radius: 8px;
                    }
                `}
            </style>

            {/* eslint-disable-next-line react/no-danger */}
            <div className="cms-container" dangerouslySetInnerHTML={{ __html: data.cmsPage.content }} />
        </>
    );
};

export default AboutUsPage;
