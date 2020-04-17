/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Drawer } from '@material-ui/core';
import Typography from '@components/Typography';
import useStyles from './style';


const ItemLook = () => {
    const styles = useStyles();
    return (
        <div className={styles.itemLookContainer}>
            <img src="/assets/img/noun_Image.svg" alt="[product name]" />
        </div>
    );
};

const data = [1, 2, 3, 4, 5, 6, 7, 8];

const RightDrawer = ({ open = false, setOpen = () => {} }) => {
    const styles = useStyles();
    const contetStyle = data.length > 3 ? styles.content : styles.contentMin;
    return (
        <div className={styles.container}>
            <div className={styles.btnOpen} onClick={setOpen}>
                <Typography
                    variant="span"
                    letter="uppercase"
                    type="regular"
                    align="center"
                >
                    shop the look
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
                                variant="span"
                                letter="uppercase"
                                type="regular"
                                align="center"
                            >
                                shop the look
                            </Typography>
                        </div>
                    </div>
                    <div className={contetStyle}>
                        {
                            data.map((item) => (<ItemLook key={item} />))
                        }
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default RightDrawer;
