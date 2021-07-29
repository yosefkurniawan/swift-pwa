import React from 'react';
import NewsletterForm from '@plugin_newsletter';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';

const MagezonNewsletter = (props) => {
    const {
        show_firstname,
        show_lastname,
        disable_element,
        layout_type,
        description,
        title,
        form_height,
        form_width,
        title_color,
        title_font_size,
    } = props;
    const classes = useStyles(props);
    if (!disable_element) {
        return (
            <div className={classes.container}>
                <NewsletterForm
                    isCms
                    layout_type={layout_type}
                    description={description}
                    title={title}
                    show_firstname={show_firstname}
                    show_lastname={show_lastname}
                    form_height={form_height}
                    form_width={form_width}
                    title_font_size={title_font_size}
                    title_color={title_color}
                />
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
