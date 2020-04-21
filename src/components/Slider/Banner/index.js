import React, { useState } from 'react';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ImageSlide from './ImageSlide';
import useStyles from './style';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Banner = ({
    data = [],
    height = '100%',
    initial = { url: 'url', link: '' },
}) => {
    const styles = useStyles();
    const [index, setIndex] = useState(0);

    const dotActive = data.length > 1
        ? classNames(styles.dotsItem, styles.dotActive)
        : styles.hide;
    const dotItem = data.length > 1 ? styles.dotsItem : styles.hide;

    return (
        <div className={styles.caraousel}>
            <AutoPlaySwipeableViews
                index={index}
                onChangeIndex={(i) => setIndex(i)}
                enableMouseEvents
            >
                {data.map((item, key) => (
                    <ImageSlide
                        height={height}
                        key={key}
                        url={item[initial.url]}
                        link={item[initial.link]}
                    />
                ))}
            </AutoPlaySwipeableViews>
            <div className={styles.dots}>
                {data.map((item, id) => (
                    /* eslint-disable jsx-a11y/click-events-have-key-events */
                    /* eslint-disable jsx-a11y/no-static-element-interactions */
                    <div
                        className={index === id ? dotActive : dotItem}
                        key={id}
                        onClick={() => setIndex(id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
