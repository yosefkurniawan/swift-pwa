import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Item from "./Item";
import useStyles from "./style";
import Typography from "../../Typography";

const Caraousel = ({ data = [1, 2, 3], title = "" }) => {
  const styles = useStyles();
  const [index, setIndex] = useState(parseInt(data.length / 2));
  return (
    <div className={styles.container}>
      {title && title !== "" && (
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
        slideClassName={styles.slideContainer}
        index={index}
        onChangeIndex={index => setIndex(index)}
        enableMouseEvents={true}
      >
        {data.map((item, index) => (
          <Item key={index} />
        ))}
      </SwipeableViews>
    </div>
  );
};

export default Caraousel;
