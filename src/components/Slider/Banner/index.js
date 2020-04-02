import React, { useState, useEffect } from "react";
import classNames from "classnames";
import ImageSlide from "./ImageSlide";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import useStyles from "./style";

const Banner = ({ data = [], height = '100vh' }) => {
  const styles = useStyles();
  const [index, setIndex] = useState(0);

  const dotActive =
    data.length > 1
      ?  classNames(styles.dotsItem, styles.dotActive) : styles.hide
  const dotItem =
    data.length > 1
      ? styles.dotsItem
      : styles.hide

  return (
    <div className={styles.caraousel}>
      <AutoPlaySwipeableViews
        index={index}
        onChangeIndex={index => setIndex(index)}
        enableMouseEvents={true}
      >
        {data.map((item, key) => {
          return <ImageSlide height={height} key={key} src={item.img} link={item.link} />;
        })}
      </AutoPlaySwipeableViews>
      <div className={styles.dots}>
        {data.map((item, id) => (
          <div
            className={index === id ? dotActive : dotItem}
            key={id}
            onClick={() => setIndex(id)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
