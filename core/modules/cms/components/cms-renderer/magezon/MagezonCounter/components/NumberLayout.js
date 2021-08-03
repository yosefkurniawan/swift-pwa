import React from 'react';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import Typography from '@common_typography';

const NumberLayout = (props) => {
    const {
        number_type, number, speed, delay, number_size,
        before_number_text, number_prefix, number_text,
        number_suffix, icon, after_number_text,
        circle_size,
    } = props;
    const [count, setCount] = React.useState(0);
    const speedCount = typeof speed === 'number'
        ? (speed * 1000) / number : (parseInt(speed, 0) * 1000) / number;
    React.useEffect(() => {
        if (count < number) {
            setTimeout(() => {
                setCount(count + 1);
            }, speed ? speedCount : 100);
        }
    }, [count]);

    React.useEffect(() => {
        if (delay && delay > 0) {
            setTimeout(() => {
                setCount(count + 1);
            }, delay * 1000);
        } else {
            setCount(count + 1);
        }
    }, []);
    return (
        <div className="number-container">
            <Typography align="center" variant="p" style={{ fontSize: '12px' }}>
                {before_number_text}
            </Typography>
            <div className="number-wrapper">
                {number_prefix ? (
                    <Typography variant="p" style={{ fontSize: '12px' }}>
                        {number_prefix}
                    </Typography>
                ) : null}
                {number_text ? (
                    <Typography variant="h1" type="bold">
                        {number_text}
                    </Typography>
                ) : null}
                {icon ? (
                    <div className="icon-circle">
                        <MagezonIcon icon={icon} icon_size={number_size} />
                    </div>
                ) : null}
                <span className="mgz-counter-number">
                    {
                        number_type === 'percent'
                            ? `${count}%` : count
                    }
                </span>
                {number_suffix ? (
                    <Typography variant="p" style={{ fontSize: '12px' }}>
                        {number_suffix}
                    </Typography>
                ) : null}
            </div>
            <Typography align="center" variant="p" style={{ fontSize: '12px' }}>
                {after_number_text}
            </Typography>

            <style jsx>
                {`
                    .icon-circle {
                        margin-top: -20px;
                    }
                    .mgz-counter-number {
                        font-size: ${number_size}px;
                    }
                    .number-wrapper {
                        width: ${circle_size}px;
                        height: ${circle_size}px;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }
                    .number-container {
                        display: flex;
                        flex-direction: column;
                        width: ${circle_size}px;
                        height: ${circle_size}px;
                    }
                `}
            </style>
        </div>
    );
};

export default NumberLayout;
