import Header from '@common_headermobile';
import ShoppingBagIcon from '@plugin_shoppingbag';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    container: {
        zIndex: 6,
    },
});

const CustomHeader = (props) => {
    const styles = useStyles();
    const { storeConfig } = props;
    return (
        <Header
            RightComponent={(
                <ShoppingBagIcon withLink storeConfig={storeConfig} />
            )}
            className={styles.container}
            {...props}
        />
    );
};

export default CustomHeader;
