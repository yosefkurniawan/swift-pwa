const CmsPage = (props) => {
    const { content } = props;

    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="cms-container" dangerouslySetInnerHTML={{ __html: content }} />
        </>
    );
};

export default CmsPage;
