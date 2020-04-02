import useStyles from "../style";
import { Button, Box } from "@material-ui/core";
import Carousel from "@components/slider/Carousel";

const Cart = ({ t }) => {
    const styles = useStyles();
    
    return (
        <>
            <Box className={styles.container}>
                <div className={styles.toolbar}>
                    <div className="counter">
                        <span>2</span>
                        {t("cart:counter:text")}
                    </div>
                    <div className="actions">
                        <Button>{t("common:edit")}</Button>
                    </div>
                </div>
                <div className={styles.items}>
                    <div className="item">
                        <div className="imageWrapper">
                            <img
                                src="/assets/img/sample/product.png"
                                className="imgProduct"
                            />
                        </div>
                        <div className="info">
                            <div className="productTitle">Product Name</div>
                            <div className="variant">
                                <div>{t("common:variant")}</div>
                                <div>Color : Black</div>
                                <div>Size : S</div>
                            </div>
                        </div>
                        <div className="actions">
                            <button>Edit</button>
                            <button>Wishlist</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className="item">
                        <div className="imageWrapper">
                            <img
                                src="/assets/img/sample/product.png"
                                className="imgProduct"
                            />
                        </div>
                        <div className="info">
                            <div className="productTitle">Product Name</div>
                            <div className="variant">
                                <div>{t("common:variant")}</div>
                                <div>Color : Black</div>
                                <div>Size : S</div>
                            </div>
                        </div>
                        <div className="actions">
                            <button>Edit</button>
                            <button>Wishlist</button>
                            <button>Remove</button>
                        </div>
                    </div>
                </div>
            </Box>
            <div className="upsell">
                <div className={styles.slider}>
                    <Carousel />
                </div>
            </div>
        </>
    );
};

export default Cart;
