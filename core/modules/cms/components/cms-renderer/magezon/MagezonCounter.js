import React from 'react';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import CircularProgress from '@material-ui/core/CircularProgress';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import Typography from '@common_typography';
import { makeStyles } from '@material-ui/core/styles';

const stylesCircle = makeStyles({
    root: {
        color: (theme) => theme.color,
    },
});

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
            {beforeText}
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
            {afterText}
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
    const classes = useStyles(props);
    const styles = stylesCircle({ color: circle_color1 });
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
            <div className="circle-wrapper">
                <CircularProgress classes={styles} variant="determinate" value={progress} size={Number(circle_size)} color={circle_color1} />
                <div className="content-circle">
                    {number_text}
                    {icon ? (
                        <div className="icon-circle">
                            <MagezonIcon icon={icon} icon_size={number_size} />
                        </div>
                    ) : null}
                </div>
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
    }

    return (
        <div className={`${classes.container}`}>
            <div className="progress-wrapper">{content}</div>
            <style jsx global>
                {`
                    .progress-wrapper {
                        width: 90vw;
                        margin-bottom: 50px;
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
                `}
            </style>
        </div>
    );
};

export default MagezonCounter;
