import React, { useState } from "react";
import useStyles from "../style";
import Typography from "../../../commons/Typography";
import Button from "../../../commons/Button";
import { Slide, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Router from "next/router";

const SubCategory = ({ open, data, category, onBack }) => {
  console.log(data)
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
          {data[0].name}
        </Typography>
        <div className={styles.item}>
          {data[0].children.map((item, indx) => (
            <Button
              key={indx}
              variant="text"
              capitalize={true}
              onClick={() => {
                Router.push('/category/'+item.url_path.toLowerCase())
              }}
            >
              <Typography variant="span">{item.name}</Typography>
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

export default SubCategory;
