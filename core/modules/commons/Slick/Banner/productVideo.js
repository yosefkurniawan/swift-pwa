import useStyles from '@common_slick/Banner/style';

const generateVideo = (props) => {
    const styles = useStyles();
    const { urlEmbed, videoUrl, video } = props;

    if (urlEmbed || video) {
        const urlVideoTag = video ? video.split('"') : null;
        return (
            <div className={styles.productVideo}>
                <iframe
                    width="100%"
                    height="600"
                    src={urlEmbed || urlVideoTag[5]}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={urlVideoTag ? urlVideoTag[8] : ''}
                />
            </div>
        );
    }
    if (videoUrl) {
        const urlVideo = videoUrl && videoUrl.video_url.split('/');

        return (
            <div className={styles.productVideo}>
                <iframe
                    width="100%"
                    height="600"
                    src={`https://www.youtube.com/embed/${urlVideo[3]}`}
                    title={videoUrl.video_title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }
    return null;
};

export default generateVideo;
