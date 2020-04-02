import useStyles from "./style";
import Carousel from "@components/slider/Carousel";
import Typography from "@components//Typography";

const CrossSell = props => {
    const { t } = props;
    const styles = useStyles();

    return (
        <>
            <div className={styles.crosssell}>
                <h3>
                    <Typography
                        variant="h3"
                        type="bold"
                        letter="uppercase"
                        align="center"
                        className={styles.crossselTitle}
                    >
                        {t("cart:crossell:title")}
                    </Typography>
                </h3>
                <div className={styles.slider}>
                    <Carousel />
                </div>
            </div>
        </>
    );
};

export default CrossSell;
