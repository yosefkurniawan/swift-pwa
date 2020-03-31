import React from "react";
import useStyles from "./style";
import checkComponent from "../../../helpers/checkComponent";
import { Button, NoSsr } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Typography from "../Typography";
import { useRouter } from "next/router";
import classNames from "classnames";

const Header = ({
  LeftComponent,
  CenterComponent,
  RightComponent,
  className = {}
}) => {
  const styles = useStyles();
  const route = useRouter();
  const back = () => {
    route.back();
  };
  const containerStyle = classNames(styles.container, className);
  return (
    <div className={containerStyle}>
      <div className={styles.leftContainer}>
        {React.isValidElement(LeftComponent) ? (
          LeftComponent
        ) : (
          <Button
            onClick={
              (LeftComponent &&
                LeftComponent.onClick &&
                LeftComponent.onClick) ||
              back
            }
            className={styles.btmBack}
          >
            <ArrowBack className={styles.backIcon} />
          </Button>
        )}
      </div>
      <div className={styles.centerContainer}>
        {React.isValidElement(CenterComponent)
          ? CenterComponent
          : CenterComponent && (
              <Typography variant="title" type="bold">
                {(CenterComponent.title && CenterComponent.title) || "Header"}
              </Typography>
            )}
      </div>
      <div className={styles.rightContainer}>
        {checkComponent(RightComponent) && RightComponent}
      </div>
    </div>
  );
};

const CustomHeader = props => (
  <NoSsr>
    <Header {...props} />
  </NoSsr>
);

export default CustomHeader;
