import Typography from '@components/Typography';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import Item from './Item';
import useStyles from './style';

const Caraousel = ({
    data = [1, 2, 3],
    title = '',
    className = '',
    storeConfig,
    customItem,
    customSlideClass,
}) => {
    const styles = useStyles();
    const [index, setIndex] = useState(parseInt(data.length / 2, 10));
    let { slideContainer } = styles;

    if (customSlideClass) {
        slideContainer = classNames(styles.slideContainer, customSlideClass);
    }

    return (
        <div className={classNames(styles.container, className)}>
            {title && title !== '' && (
                <Typography
                    align="center"
                    letter="uppercase"
                    type="bold"
                    variant="span"
                    className={styles.title}
                >
                    {title}
                </Typography>
            )}
            <SwipeableViews
                className={styles.caraousel}
                slideClassName={slideContainer}
                index={index}
                onChangeIndex={(i) => setIndex(i)}
                enableMouseEvents
            >
                {data.map((item, y) => (
                    customItem ? customItem({
                        ...item,
                        storeConfig,
                        key: y,
                    }) : <Item {...item} key={y} storeConfig={storeConfig} />
                ))}
            </SwipeableViews>
        </div>
    );
};

export default Caraousel;
