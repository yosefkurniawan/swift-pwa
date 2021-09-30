import CmsRenderer from '@core_modules/cms/components/cms-renderer';

const MagezonSection = (props) => {
    const { elements, storeConfig } = props;

    return (
        <>
            <div className="mgz-section">
                {elements.map((element, index) => (
                    <div className="mgz-section-item">
                        <CmsRenderer key={index} content={element} storeConfig={storeConfig} />
                    </div>
                ))}
            </div>
            <style jsx>
                {`
                    .mgz-section-item {
                        margin: 20px 0;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonSection;
