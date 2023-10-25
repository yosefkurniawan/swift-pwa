/* eslint-disable react/no-danger */
import React from 'react';
// import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
// import useStyles from '@core_modules/cms/components/cms-renderer/magezon/style';
import Thumbor from '@common_image';
import useStyles from '@common_slick/Banner/style';
import classNames from 'classnames';

const MagezonText = (props) => {
    const {
        content, ...other
    } = props;

    const classes = useStyles(props);
    return (
        <div className={`${classes.container}`}>
            {/* <WidgetRenderer content={content} {...other} /> */}
            {/* test */}
            <div>
                <Thumbor
                    src="https://b2cdemo.getswift.asia/media/weltpixel/owlcarouselslider/images/h/7/h7_h1_1.jpg"
                    width={1420}
                    height={592}
                    className={
                        classNames(classes.imageSlider, classes.thumborImage)
                    }
                    lazy
                    slickBanner
                />
            </div>
        </div>
    );
};

export default MagezonText;
