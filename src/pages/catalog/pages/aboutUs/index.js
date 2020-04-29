import Loading from '@components/Loaders';
import { makeStyles } from '@material-ui/core/styles';
import { getCmsPage } from './services/graphql';

const useStyles = makeStyles(() => ({
    container: {
        padding: '0 16px',
        textAlign: 'justify',
    },
}));

const AboutUsPage = () => {
    const styles = useStyles();
    const { error, loading, data } = getCmsPage({ identifier: 'about-us' });
    if (error) return <p>error</p>;
    if (loading) return <Loading size="40px" />;

    return (
        <div className={styles.container}>
            <h1>About us</h1>

            <style>
                {`
                    .cms-content-important {
                        background: #f5f5f5;
                        padding: 16px;
                        border-radius: 8px;
                    }
                `}
            </style>

            {/* eslint-disable-next-line react/no-danger */}
            <div className="teszzz" dangerouslySetInnerHTML={{ __html: data.cmsPage.content }} />
        </div>
    );
};

export default AboutUsPage;
