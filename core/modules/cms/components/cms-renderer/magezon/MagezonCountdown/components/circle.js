import dayjs from 'dayjs';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const renderTime = (dimension, time) => (
    <>
        <div className={`mgz-countdown-number mgz-countdown-${dimension}`}>
            <div className="mgz-countdown-unit">
                <span className="mgz-countdown-unit-number">{`${time} `}</span>
                <div className="mgz-countdown-unit-label">{`${dimension[0].toUpperCase()}${dimension.slice(1)}`}</div>
            </div>
        </div>
        <style jsx>
            {`
                    .time-wrapper {
                        text-align: center;
                    }
                    .mgz-countdown-unit {
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                    }
                `}
        </style>
    </>
);

/* eslint-disable no-bitwise */
const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const CircleCountdown = (props) => {
    const {
        date: endTimer, circle_background_color, circle_color1, circle_color2, circle_dash_width, circle_size,
    } = props;
    const timerProps = {
        isPlaying: true,
        size: circle_size.replace('px', ''),
        strokeWidth: 6,
        rotation: 'counterclockwise',
    };

    const remainingTime = endTimer.unix() - dayjs().unix();
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    return (
        <>
            <div className="mgz-countdown-circle">
                <div className="mgz-countdown-circle-timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[[circle_color1 || '#ff9900']]}
                        trailColor={circle_color2 || '#eaeaea'}
                        strokeWidth={circle_dash_width.replace('px', '')}
                        duration={daysDuration}
                        initialRemainingTime={remainingTime}
                    >
                        {({ elapsedTime }) => renderTime('days', getTimeDays(daysDuration - elapsedTime))}
                    </CountdownCircleTimer>
                </div>
                <div className="mgz-countdown-circle-timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[[circle_color1 || '#ff9900']]}
                        trailColor={circle_color2 || '#eaeaea'}
                        strokeWidth={circle_dash_width.replace('px', '')}
                        duration={daySeconds}
                        initialRemainingTime={remainingTime % daySeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > hourSeconds]}
                    >
                        {({ elapsedTime }) => renderTime('hours', getTimeHours(daySeconds - elapsedTime))}
                    </CountdownCircleTimer>
                </div>
                <div className="mgz-countdown-circle-timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[[circle_color1 || '#ff9900']]}
                        trailColor={circle_color2 || '#eaeaea'}
                        strokeWidth={circle_dash_width.replace('px', '')}
                        duration={hourSeconds}
                        initialRemainingTime={remainingTime % hourSeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > minuteSeconds]}
                    >
                        {({ elapsedTime }) => renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))}
                    </CountdownCircleTimer>
                </div>
                <div className="mgz-countdown-circle-timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[[circle_color1 || '#ff9900']]}
                        trailColor={circle_color2 || '#eaeaea'}
                        strokeWidth={circle_dash_width.replace('px', '')}
                        duration={minuteSeconds}
                        initialRemainingTime={remainingTime % minuteSeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > 0]}
                    >
                        {({ elapsedTime }) => renderTime('seconds', getTimeSeconds(elapsedTime))}
                    </CountdownCircleTimer>
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-countdown-circle {
                        display: flex;
                    }
                    .mgz-countdown-circle-timer {
                        width: ${circle_size};
                        height: ${circle_size};
                        border-radius: 50%;
                        background-color: ${circle_background_color || '#ffffff'};
                    }
                `}
            </style>
        </>
    );
};

export default CircleCountdown;
