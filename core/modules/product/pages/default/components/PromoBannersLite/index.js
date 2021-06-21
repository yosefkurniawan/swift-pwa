import Thumbor from '@common_image';

const PromoBannersLite = (props) => {
    const {
        src = '', imgSrc = '', alt = '', classes, width = 1300, height = 500,
    } = props;

    return (
        <div className={classes}>
            {src !== '' ? (
                <a href={src}>
                    <Thumbor src={imgSrc} alt={alt} width={width} height={height} />
                </a>
            ) : (
                <Thumbor src={imgSrc} alt={alt} width={width} height={height} />
            )}
        </div>
    );
};

export default PromoBannersLite;
