import React from "react";
import useStyles from "../style";
import Typography from "@components/Typography";
import Button from "@components/Button";
import { Slide } from "@material-ui/core";

const Category = ({
  open,
  data,
  onClick,
  direction = "left",
  slide = false
}) => {
  const styles = useStyles();

  const content = () => (
  <div className={styles.body}>
    <div className={styles.item}>
      {data.length ? 
        data.map((cat_lvl1, index) => (
          <>
            <Typography key={index} variant="h1" align="center">
              {cat_lvl1.name}
            </Typography>
            {cat_lvl1.children.map((cat_lvl2, indx) => (
              <Button
                key={indx}
                variant="text"
                capitalize={true}
                onClick={() => onClick(cat_lvl2)}
              >
                <Typography variant="span">{cat_lvl2.name}</Typography>
              </Button>
            ))}
          </>
        ))
       : null}
    </div>
  </div>);

  if (slide === true) {
    return (
      <Slide
        direction={direction}
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {content()}
      </Slide>
    );
  } else {
    return <>{content()}</>
  }
};

export default Category;
