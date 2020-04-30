import Loading from '@components/Loaders';
import { getContactPage } from './services/graphql';

const ContactPage = () => {
    const { error, loading, data } = getContactPage();
    if (error) return <p>error</p>;
    if (loading) return <Loading size="50px" />;

    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="cms-container" dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }} />
        </>
    );
};

export default ContactPage;
