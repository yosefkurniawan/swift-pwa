import React, { useState, useEffect } from "react";
import classNames from "classnames";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
import Item from "./Item";

// const VirtualizeView = virtualize(SwipeableViews);

import useStyles from "./style";

function slideRenderer(params) {
  const styles = {
    slide1: {
      backgroundColor: "#FEA900",
      height: 100
    },
    slide2: {
      backgroundColor: "#B3DC4A",
      height: 100
    },
    slide3: {
      backgroundColor: "#6AC0FF",
      height: 100
    }
  };

  const { index, key } = params;
  let style;

  switch (mod(index, 3)) {
    case 0:
      style = styles.slide1;
      break;

    case 1:
      style = styles.slide2;
      break;

    case 2:
      style = styles.slide3;
      break;

    default:
      break;
  }

  return <Item key={key} />;
}

const Component = ({ data = [1,2,3] }) => {
  const styles = useStyles();
  const [index, setIndex] = useState(parseInt(data.length/2));
  return (
    <div className={styles.container}>
      <SwipeableViews
        className={styles.caraousel}
        slideClassName={styles.slideContainer}
        index={index}
        onChangeIndex={index => setIndex(index)}
        enableMouseEvents={true}
      >
        {
          data.map((item, index) => (
            <Item key={index} />
          ))
        }
      </SwipeableViews>
    </div>
  );
};

export default Component;
