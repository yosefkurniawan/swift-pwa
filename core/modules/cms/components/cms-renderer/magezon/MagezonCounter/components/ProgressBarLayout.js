import React from 'react';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import Typography from '@common_typography';

const ProgressBarLayout = ({
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

export default ProgressBarLayout;
