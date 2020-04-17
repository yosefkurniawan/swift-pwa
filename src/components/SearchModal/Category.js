import React from "react";
import useStyles from "./style";
import Typography from "@components/Typography";
import Button from "@components/Button";
import { Slide } from "@material-ui/core";

const Category = ({
  open,
  data,
  onClick,
  direction = "left",
  slide = false,
}) => {
  const styles = useStyles();

  const content = () => (
    <div className={styles.body}>
      <div className={styles.item}>
        {data.length
          ? data.map((cat_lvl1, index) => (
              <div key={index} className="column">
                <Typography variant="h1" align="center">
                  {cat_lvl1.name}
                </Typography>
                {cat_lvl1.children.map((cat_lvl2, indx) => (
                  <Button
                    variant="text"
                    onClick={() => onClick(cat_lvl2)}
                    key={indx}
                  >
                    <Typography variant="span" letter="capitalize">
                      {cat_lvl2.name}
                    </Typography>
                  </Button>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );

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
    return <>{content()}</>;
  }
};

export default Category;
