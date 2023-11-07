/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Drawer from '@material-ui/core/Drawer';
import Typography from '@common_typography';
import Link from 'next/link';
import classNames from 'classnames';
import Image from '@common_image';
import Tooltip from '@material-ui/core/Tooltip';
import propTypes from 'prop-types';
import useStyles from '@core_modules/product/pages/default/components/RightDrawer/style';

const ItemLook = (props) => {
    const { url_key, small_image: { url, label }, storeConfig = {} } = props;
    const styles = useStyles();

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 10);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 10);

    return (
        <div className={classNames('col-xs-12 col-sm-12 col-md-6 col-lg-6', styles.itemLookContainer)}>
            <Link href="[...slug]" as={`${url_key}`} className={styles.imageLookContainer}>

                <Tooltip title={label}>
                    <Image
                        src={url}
                        className={styles.img}
                        alt={label && url ? label : 'Product'}
                        width={defaultWidth}
                        height={defaultHeight}
                        quality={80}
                    />
                </Tooltip>

            </Link>
        </div>
    );
};

const UpsellDrawerView = (props) => {
    const {
        open = false, setOpen = () => {}, t, data = [], storeConfig = {},
    } = props;
    // const data = props.data.upsell_products ? props.data.upsell_products : [];
    const styles = useStyles();
    const contetStyle = data.length > 3 ? styles.content : styles.contentMin;
    return (
        <div className={styles.container}>
            <div className={styles.btnOpen} onClick={setOpen}>
                <Typography
                    className={styles.btnOpenLabel}
                    variant="span"
                    letter="uppercase"
                    type="regular"
                    align="center"
                >
                    { t('product:upsellTitle') }
                </Typography>
            </div>
            <Drawer
                anchor="right"
                open={open}
                onClose={setOpen}
                BackdropProps={{ invisible: true }}
                className={styles.drawerContainer}
                color="transparent"
            >
                <div className={styles.body}>
                    <div className={styles.contianerBtnDrawer}>
                        <div className={styles.btnOpenInDrawer} onClick={setOpen}>
                            <Typography
                                className={styles.btnOpenLabel}
                                variant="span"
                                letter="uppercase"
                                type="regular"
                                align="center"
                            >
                                { t('product:upsellTitle') }
                            </Typography>
                        </div>
                    </div>
                    <div className={contetStyle}>
                        <div className="row" style={{ height: 'fit-content', width: '100%' }}>
                            {
                                data.length > 0
                                && data.map((item, index) => (<ItemLook key={index} {...item} storeConfig={storeConfig} />))
                            }
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

UpsellDrawerView.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired,
    data: propTypes.array,
    t: propTypes.func.isRequired,
};

UpsellDrawerView.defaultProps = {
    data: [],
};

export default UpsellDrawerView;
