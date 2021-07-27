import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

const Countdown = dynamic(import('react-countdown'));
const CircleCountdown = dynamic(import('@core_modules/cms/components/cms-renderer/magezon/MagezonCountdown/components/circle'));

const CustomCountdown = (props) => {
    const { type, value } = props;
    return (
        <div className={`mgz-countdown-number mgz-countdown-${type}`}>
            <div className="mgz-countdown-unit">
                <span className="mgz-countdown-unit-number">{`${value} `}</span>
                <div className="mgz-countdown-unit-label">{`${type[0].toUpperCase()}${type.slice(1)}`}</div>
            </div>
        </div>
    );
};

const MagezonCountdown = (props) => {
    // prettier-ignore
    const {
        layout,
        circle_background_color, circle_color1, circle_color2,
        circle_dash_width, circle_size,
        show_separator, separator_type, separator_color, separator_size,
        year, month, day,
        hours, minutes,
        heading_text, heading_font_size, heading_color,
        sub_heading_text, sub_heading_font_size, sub_heading_color,
        text_inline, text_size, text_color,
        number_background_color, number_border_radius, number_color,
        number_padding, number_size, number_spacing,
        link_text,
        // link_url, link_font_size, link_color,
    } = props;
    // console.log(props);

    const renderer = ({
        days, hours: rendererHours, minutes: rendererMinutes, seconds,
    }) => {
        const separator = separator_type === 'line' ? '|' : ':';

        return (
            <>
                <div className="mgz-countdown-counter">
                    <CustomCountdown type="days" value={days} />
                    {show_separator && <span className="mgz-countdown-separator">{separator}</span>}
                    <CustomCountdown type="hours" value={rendererHours} />
                    {show_separator && <span className="mgz-countdown-separator">{separator}</span>}
                    <CustomCountdown type="minutes" value={rendererMinutes} />
                    {show_separator && <span className="mgz-countdown-separator">{separator}</span>}
                    <CustomCountdown type="seconds" value={seconds} />
                </div>
            </>
        );
    };

    return (
        <>
            <div className="mgz-countdown mgz-countdown-separator-line">
                <div className="mgz-countdown-heading-wrapper">
                    <div className="mgz-countdown-subheading">{sub_heading_text}</div>
                    <div className="mgz-countdown-heading">{heading_text}</div>
                </div>
                {layout === 'numbers' ? (
                    <Countdown date={dayjs(new Date(year, month - 1, day, hours, minutes)).toDate()} renderer={renderer} />
                ) : (
                    <CircleCountdown
                        date={dayjs(new Date(year, month - 1, day, hours, minutes))}
                        circle_background_color={circle_background_color}
                        circle_color1={circle_color1}
                        circle_color2={circle_color2}
                        circle_dash_width={circle_dash_width}
                        circle_size={circle_size}
                    />
                )}
                <div className="mgz-countdown-link">{link_text}</div>
            </div>

            <style jsx>
                {`
                    .mgz-countdown {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 30px;
                    }
                    .mgz-countdown-heading {
                        font-size: ${heading_font_size};
                        color: ${heading_color};
                    }
                    .mgz-countdown-subheading {
                        font-size: ${sub_heading_font_size};
                        color: ${sub_heading_color};
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-countdown-number {
                        display: inline-block;
                        margin: ${number_spacing ? `${number_spacing}px` : '10px'};
                    }
                    .mgz-countdown-unit {
                        background-color: ${number_background_color};
                        border-radius: ${number_border_radius}px;
                        padding: ${number_padding};
                    }
                    .mgz-countdown-unit-number {
                        color: ${number_color};
                        font-size: ${number_size};
                    }
                    .mgz-countdown-unit-label {
                        display: ${text_inline ? 'inline-block' : 'block'};
                        font-size: ${text_size}px;
                        color: ${text_color};
                    }
                    .mgz-countdown-separator {
                        color: ${separator_color};
                        font-size: ${separator_size}px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonCountdown;
