import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import Typography from '@common_typography';

const CircleLayout = (props) => {
    const {
        icon,
        number_prefix,
        after_number_text,
        before_number_text,
        number_text,
        number_suffix,
        circle_color1,
        circle_size,
        number_size,
        progress,
    } = props;
    return (
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
};

export default CircleLayout;
