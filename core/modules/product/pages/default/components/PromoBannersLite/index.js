import Thumbor from '@common_image';

const PromoBannersLite = (props) => {
    const {
        src = '', imgSrc = '', alt = '', classes,
    } = props;

    return (
        <div className={classes}>
            {src !== '' ? (
                <a href={src}>
                    <Thumbor src={imgSrc} alt={alt} width={1175} height={424} />
                </a>
            ) : (
                <Thumbor src={imgSrc} alt={alt} width={1175} height={424} />
            )}
        </div>
    );
};

export default PromoBannersLite;
