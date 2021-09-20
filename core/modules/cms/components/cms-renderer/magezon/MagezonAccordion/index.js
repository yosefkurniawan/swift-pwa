/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */

import Heading from '@core_modules/cms/components/cms-renderer/magezon/components/commons/heading';
import { Accordion, AccordionDetails, AccordionSummary } from '@core_modules/cms/components/cms-renderer/magezon/MagezonCategories/accordion';
import { useState } from 'react';

const MagezonAccordion = (props) => {
    // prettier-ignore
    const {
        accordion_icon, active_icon, active_sections, at_least_one_open,
        collapsible_all, description, elements,
        icon, icon_position, no_fill_content_area,
        section_active_color, section_align, section_border_style,
        section_color, section_hover_color,
        line_color, line_position, line_width, show_line,
        title, title_align, title_tag, title_color,
    } = props;
    const [expanded, setExpanded] = useState(false);
    const accordionsState = elements.length > 0 && elements.map((_, index) => ({ [`accordion-${index}`]: false }));
    const [expandedList, setExpandedList] = useState(accordionsState);

    console.log('props', props);
    console.log(accordionsState);

    const headingProps = {
        description,
        title,
        title_align,
        title_tag,
        title_color,
        line_color,
        line_position,
        line_width,
        show_line,
    };

    const handleExpand = (panel) => (event, isExpanded) => {
        // const oneOpen = at_least_one_open && isExpanded === panel;
        console.log(expanded);
        if (at_least_one_open && panel === expanded) {
            // one has to be active
            setExpanded(panel);
        } else if (collapsible_all && panel !== expanded) {
            console.log('here', panel);
            setExpanded(panel);
        } else {
            // only one active
            setExpanded(isExpanded ? panel : false);
        }
    };

    // console.log('props', props);
    // console.log('expanded', expanded);

    return (
        <>
            <div className="mgz-accordion">
                <Heading {...headingProps} />
                <div className="mgz-accordion-content">
                    {elements.length > 0 &&
                        elements.map((element, index) => {
                            return (
                                <Accordion
                                    key={index}
                                    expanded={expanded === expandedList[`accordion-${index}`]}
                                    onChange={handleExpand(index)}
                                    TransitionProps={{ unmountOnExit: true }}
                                >
                                    <AccordionSummary>{element.title}</AccordionSummary>
                                    <AccordionDetails>content</AccordionDetails>
                                </Accordion>
                            );
                        })}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-accordion :global(.MuiAccordion-root) {
                        color: #333;
                        background-color: #f8f8f8;
                        border: none;
                    }
                    .mgz-accordion :global(.MuiAccordion-root > div) {
                        border: 1px solid #eee;
                        border-style: ${section_border_style || 'solid'};
                    }
                `}
            </style>
        </>
    );
};

export default MagezonAccordion;
