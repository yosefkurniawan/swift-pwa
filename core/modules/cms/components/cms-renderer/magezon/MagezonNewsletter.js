import React from 'react';
import NewsletterForm from '@plugin_newsletter';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonNewsletter = (props) => {
    const { disable_element } = props;
    const classes = useStyles(props);
    if (!disable_element) {
        return (
            <div className={classes.container}>
                <NewsletterForm isCms {...props} />
                <style jsx global>
                    {`
                        .container {
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

export default MagezonNewsletter;
