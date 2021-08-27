/* eslint-disable no-unused-vars */
import Typography from '@common_typography';
import { Accordion, AccordionSummary, AccordionDetails } from '@core_modules/cms/components/cms-renderer/magezon/MagezonCategories/accordion';

import { getCategories } from '@core_modules/cms/services/graphql';

const MagezonCategories = (props) => {
    // prettier-ignore
    const {
        categories, description,
        line_color, line_position, line_width,
        link_border_color, link_border_width, link_color,
        link_font_size, link_font_weight, link_hover_color,
        show_count, show_hierarchical, show_line,
        title, title_align, title_tag,
    } = props;

    const showLineClass = show_line ? 'mgz-categories-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-categories-heading-line--bottom' : '';

    const { data, loading } = getCategories({ ids: categories });
    console.log(data);

    if (loading && !data) return <>Loading</>;

    return (
        <>
            <div className="mgz-categories">
                <div className={`mgz-categories-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-categories-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div className="mgz-categories-heading-description">{description}</div>
                </div>
                <div className="mgz-categories-content">
                    {data.categoryList.map((category, index) => (
                        <Accordion>
                            <AccordionSummary>Accordion 1</AccordionSummary>
                            <AccordionDetails>Details</AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-categories-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-categories-heading-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width}px;
                        background-color: ${line_color};
                    }
                    .mgz-categories-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-categories-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonCategories;
