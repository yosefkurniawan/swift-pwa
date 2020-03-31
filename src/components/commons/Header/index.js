import React from "react";
import useStyles from "./style";
import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useRouter } from "next/router";
import classNames from "classnames";

const Header = ({
    LeftComponent,
    CenterComponent,
    RightComponent,
    className = {},
    pageConfig
}) => {
    const styles = useStyles();
    const route = useRouter();
    const back = () => {
        route.back();
    };
    const containerStyle = classNames(styles.container, className);

    if (pageConfig && !pageConfig.header) return null;

    const position =
        pageConfig && pageConfig.header == "absolute"
            ? styles.headerAbsolute
            : styles.headerRelative;

    return (
        <header className={[containerStyle, position].join(" ")}>
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
                        className={styles.btnBack}
                    >
                        <ArrowBack className={styles.backIcon} />
                    </Button>
                )}
            </div>
            <div className={styles.centerContainer}>
                {React.isValidElement(CenterComponent)
                    ? CenterComponent
                    : null}
            </div>
            <div className={styles.rightContainer}>
                {React.isValidElement(RightComponent)
                    ? RightComponent
                    : null}
            </div>
        </header>
    );
};

export default Header;
