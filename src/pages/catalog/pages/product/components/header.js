import Header from '@components/Header';
import ShoppingBagIcon from '@components/ShoppingBagIcon';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        zIndex: 6,
    },
});

const CustomHeader = ({ pageConfig }) => {
    const styles = useStyles();
    return (
        <Header
            pageConfig={pageConfig}
            RightComponent={(
                <ShoppingBagIcon />
            )}
            className={styles.container}
        />
    );
};

export default CustomHeader;
