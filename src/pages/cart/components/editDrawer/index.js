import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@components/Typography';
import Button from '@components/Button';
import {
    MenuItem, Select,
} from '@material-ui/core';
import useStyles from './style';


const renderQty = () => {
    const options = [];
    // eslint-disable-next-line no-plusplus
    for (let item = 1; item <= 10; item++) {
        options.push(
            <MenuItem key={item} value={item}>
                {item}
            </MenuItem>,
        );
    }
    return options;
};


const EditDrawer = ({
    t, open, toggleOpen, id, quantity = 1, product_name = '', updateItem,
}) => {
    const styles = useStyles();
    const dataQty = renderQty();
    const [qty, setQty] = React.useState(quantity);

    React.useEffect(() => {
        setQty(quantity);
    }, [quantity]);
    const toggleDrawer = (anchor, _open) => (event) => {
        if (
            event
            && event.type === 'keydown'
            && (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        toggleOpen(!_open);
    };
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer('bottom', false)}
            onOpen={toggleDrawer('bottom', true)}
        >
            <div className={styles.container}>
                <Typography variant="title" type="regular" align="center">
                    {product_name}
                </Typography>
                <div className={styles.qty}>
                    <Typography variant="span">{t('common:title:qty')}</Typography>
                    <Select
                        defaultValue={1}
                        value={qty}
                        onChange={(e) => { setQty(e.target.value); }}
                        variant="outlined"
                    >
                        {dataQty}
                    </Select>
                </div>
                <Button
                    className={styles.toolbarButton}
                    onClick={() => {
                        toggleOpen(false);
                        updateItem({
                            cart_item_id: id,
                            quantity: qty,
                        });
                    }}
                    customRootStyle={{ width: 'fit-content' }}
                >
                    {t('cart:button:saveEdit')}
                </Button>
            </div>
        </SwipeableDrawer>
    );
};

export default EditDrawer;
