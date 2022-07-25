import useStyles from '@common_slick/Banner/style';

const generateVideo = (props) => {
    const styles = useStyles();
    const { videoUrl } = props;

    const urlVideoTag = videoUrl.split('"');

    if (videoUrl) {
        return (
            <div className={styles.productVideo}>
                <iframe
                    width="100%"
                    height="600px"
                    src={urlVideoTag[5]}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={urlVideoTag[8]}
                />
            </div>
        );
    }
    return null;
};

export default generateVideo;
