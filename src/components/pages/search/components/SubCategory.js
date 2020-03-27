import React, { useState } from "react";
import useStyles from "../style";
import Typography from "../../../commons/Typography";
import Button from "../../../commons/Button";
import { Slide, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const SubCategory = ({ open, data, onBack }) => {
    const styles = useStyles();

    return (
        <Slide
            direction="left"
            in={open}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.body}>
                <div className={styles.item}>
                    <Typography variant="h1" align="center">
                        {data[0].name}
                    </Typography>
                    {data[0].children.map((cat_lvl3, indx) => (
                        <Button
                            key={indx}
                            variant="text"
                            capitalize={true}
                            onClick={() => {}}
                        >
                            <Typography variant="span">
                                {cat_lvl3.name}
                            </Typography>
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
