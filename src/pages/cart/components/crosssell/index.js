import useStyles from "./style";
import Carousel from "@components/Slider/Carousel";
import Typography from "@components/Typography";

const CrossSell = props => {
    const { t } = props;
    const styles = useStyles();

    return (
        <>
            <div className={styles.crosssell}>
                <Typography
                    variant="h3"
                    type="bold"
                    letter="uppercase"
                    align="center"
                    className={styles.crossselTitle}
                >
                    {t("cart:crossell:title")}
                </Typography>
                <div className={styles.slider}>
                    <Carousel />
                </div>
            </div>
        </>
    );
};

export default CrossSell;
