const CmsPage = (props) => {
    const { content } = props;

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
            <div className="cms-container" dangerouslySetInnerHTML={{ __html: content }} />
        </>
    );
};

export default CmsPage;
