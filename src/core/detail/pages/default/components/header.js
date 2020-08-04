import Header from '@common_header';
import ShoppingBagIcon from '@common_shopingbagicon';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    container: {
        zIndex: 6,
    },
});

const CustomHeader = (props) => {
    const styles = useStyles();
    return (
        <Header
            RightComponent={(
                <ShoppingBagIcon />
            )}
            className={styles.container}
            {...props}
        />
    );
};

export default CustomHeader;
