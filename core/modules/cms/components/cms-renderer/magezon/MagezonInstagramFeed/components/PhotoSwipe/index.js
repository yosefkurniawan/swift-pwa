/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useStyles from '@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed/components/PhotoSwipe/style';
import Slider from 'react-slick';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';
import classNames from 'classnames';
import Zoom from '@material-ui/core/Zoom';

const Transition = React.forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

const PhotoSwipe = (props) => {
    const {
        open, setOpen, data, max_items, imagePosition,
    } = props;
    const styles = useStyles();
    let sliderRef = React.createRef();

    const [slideIndex, setIndex] = React.useState(imagePosition);
    const [count, setCount] = React.useState(0);

    const handleLeftArrow = () => {
        sliderRef.slickGoTo(slideIndex - 1);
    };
    const handleRightArrow = () => {
        sliderRef.slickGoTo(slideIndex + 1);
    };

    const settings = {
        // className: thumbnail ? 'slick-thumbnail' : 'slick-pwa',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        centerMode: false,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
        initialSlide: imagePosition || 0,
    };

    return (
        <Dialog
            open={open}
            onClose={setOpen}
            scroll="paper"
            fullScreen
            TransitionComponent={Transition}
        >
            <DialogTitle id="scroll-dialog-title" className={styles.header}>
                <span className={styles.countItem}>
                    {`${slideIndex + 1}/${max_items}`}
                </span>
                <IconButton className={styles.btnClose} onClick={setOpen}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles.sliderContent}>
                <Slider ref={(slider) => sliderRef = slider} {...settings}>
                    {
                        data && data.length > 0 && data.map((item, idx) => (idx < max_items ? (
                            <div key={idx}>
                                <div className={styles.itemPopup}>
                                    <img
                                        className={styles.imagePopup}
                                        data-pagespeed-no-defer
                                        src={item.media_url}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/assets/img/placeholder.png';
                                        }}
                                        alt={item.id}
                                    />
                                    <div className={styles.footer}>
                                        <span className={styles.caption}>
                                            {item.caption}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : null))
                    }
                </Slider>
                <>
                    <div
                        className={classNames(styles.arrow, styles.leftArrow)}
                        onClick={handleLeftArrow}
                    >
                        <LeftArrowIcon fontSize="inherit" />
                    </div>
                    <div className={classNames(styles.arrow, styles.rightArrow)} onClick={handleRightArrow}>
                        <RightArrowIcon fontSize="inherit" />
                    </div>
                </>
            </DialogContent>

        </Dialog>
    );
};

export default PhotoSwipe;
