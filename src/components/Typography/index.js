import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Typography } from "@material-ui/core";
import useStyles from "./style";

const CustomTypography = ({
  variant,
  type,
  className = {},
  children,
  align = "left",
  letter = ''
}) => {
  const styles = useStyles();
  let customStyle = classNames(
    styles.root,
    styles[letter],
    styles[variant],
    styles[type],
    styles[align],
    className,
  );
  return (
    <Typography className={customStyle} align={align}>
      {children}
    </Typography>
  );
};

CustomTypography.propTypes = {
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h6", "p", "span", "title",'label']),
  type: PropTypes.oneOf(["bold", "italic", 'semiBold','reguler']),
  className: PropTypes.object
};

export default CustomTypography;
