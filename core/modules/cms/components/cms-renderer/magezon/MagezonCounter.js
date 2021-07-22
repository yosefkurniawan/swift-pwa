import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import Typography from '@common_typography';

const ProgressBar = ({
    bgcolor, progress, height, afterText, beforeText, icon, title, prefix, suffix,
}) => {
    const Parentdiv = {
        height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 0,
    };

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 0,
        textAlign: 'right',
    };

    const progresstext = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: '3vh',
        color: 'black',
    };

    const wrapperBar = {
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div style={wrapperBar}>
            <Typography variant="p" style={{ fontSize: '12px' }}>
                {beforeText}
            </Typography>
            <div style={Parentdiv}>
                <div style={Childdiv}>
                    <div style={progresstext}>
                        {prefix ? (
                            <Typography variant="p" style={{ fontSize: '12px', marginTop: '2vh' }}>
                                {prefix}
                            </Typography>
                        ) : null}
                        {title ? (
                            <Typography variant="h1" type="bold">
                                {title}
                            </Typography>
                        ) : null}
                        {icon ? (
                            <div style={{ marginTop: '-1vh' }}>
                                <MagezonIcon icon={icon} icon_size="lg" />
                            </div>
                        ) : null}
                        {suffix ? (
                            <Typography variant="p" style={{ fontSize: '12px', marginTop: '2vh' }}>
                                {suffix}
                            </Typography>
                        ) : null}
                    </div>
                </div>
            </div>
            <Typography variant="p" style={{ fontSize: '12px' }}>
                {afterText}
            </Typography>
        </div>
    );
};

const MagezonCounter = (props) => {
    const {
        icon,
        number,
        bar_color,
        layout,
        number_prefix,
        after_number_text,
        before_number_text,
        number_text,
        number_suffix,
        circle_color1,
        circle_size,
        number_size,
    } = props;
    const [progress, setProgress] = React.useState(0);

    /* eslint-disable */
    React.useEffect(() => {
        if (progress !== number) {
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= number ? 0 : prevProgress + 1));
            }, 10);
            return () => {
                clearInterval(timer);
            };
        }
    }, [progress]);
    /* eslint-enable */

    let content = '';
    if (layout === 'circle') {
        content = (
            <div className="circle-container">
                <Typography align="center" variant="p" style={{ fontSize: '12px' }}>
                    {before_number_text}
                </Typography>
                <div className="circle-wrapper">
                    <CircularProgress
                        style={{ color: circle_color1 }}
                        variant="determinate"
                        value={progress}
                        size={Number(circle_size)}
                        color={circle_color1}
                    />
                    <div className="content-circle">
                        {number_prefix ? (
                            <Typography variant="p" style={{ fontSize: '12px', marginTop: '2vh' }}>
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
                        {number_suffix ? (
                            <Typography variant="p" style={{ fontSize: '12px', marginTop: '2vh' }}>
                                {number_suffix}
                            </Typography>
                        ) : null}
                    </div>
                </div>
                <Typography align="center" variant="p" style={{ fontSize: '12px' }}>
                    {after_number_text}
                </Typography>
            </div>
        );
    } else if (layout === 'bars') {
        content = (
            <div className="bar-wrapper">
                <ProgressBar
                    icon={icon}
                    afterText={after_number_text}
                    beforeText={before_number_text}
                    prefix={number_prefix}
                    suffix={number_suffix}
                    bgcolor={bar_color}
                    progress={progress}
                    height={60}
                    title={number_text}
                />
            </div>
        );
    } else {
        content = (
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
                    {number_suffix ? (
                        <Typography variant="p" style={{ fontSize: '12px' }}>
                            {number_suffix}
                        </Typography>
                    ) : null}
                </div>
                <Typography align="center" variant="p" style={{ fontSize: '12px' }}>
                    {after_number_text}
                </Typography>
            </div>
        );
    }

    return (
        <div>
            <div className="progress-wrapper">{content}</div>
            <style jsx global>
                {`
                    .progress-wrapper {
                        width: 90vw;
                        margin-bottom: 50px;
                        margin-top: 50px;
                    }
                    .circle-container {
                        margin-top: 50px;
                        margin-bottom: 50px;
                        width: ${circle_size}px;
                        height: ${circle_size}px;
                    }
                    .circle-wrapper {
                        position: relative;
                        display: flex;
                        width: ${circle_size}px;
                        height: ${circle_size}px;
                    }
                    .content-circle {
                        position: absolute;
                        display: flex;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        justify-content: center;
                        align-items: center;
                        flex-direction: row;
                        font-size: ${number_size}px;
                    }
                    .icon-circle {
                        margin-top: -20px;
                    }
                    .bar-wrapper {
                        width: 100%;
                        height: 20px;
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

export default MagezonCounter;
