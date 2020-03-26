import React, { useState } from "react";
import useStyles from "../style";
import Typography from "../../../commons/Typography";
import Button from "../../../commons/Button";
import { Slide, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const Component = ({ open, data, category, onBack }) => {
  const styles = useStyles();

  return (
    <Slide
      direction="left"
      in={open}
      timeout={1000}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.body}>
        <Typography variant="h1" align="center">
          {category}
        </Typography>
        <div className={styles.item}>
          {data.map((item, indx) => (
            <Button
              key={indx}
              variant="text"
              capitalize={true}
              onClick={() => {}}
            >
              <Typography variant="span">{item}</Typography>
            </Button>
          ))}
        </div>
        <IconButton onClick={() => onBack()}>
          <ArrowBack />
        </IconButton>
      </div>
    </Slide>
  );
};

export default Component;
