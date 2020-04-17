import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@components/Typography';
import Button from '@components/Button';
import CustomRadio from '@components/Forms/Radio';
import SelectColor from '@components/Forms/SelectColor';
import SelectSize from '@components/Forms/SelectSize';
import useStyles from './style';

/* dummy color & size data */
const colorData = [
    { value: '#717171', label: 'One' },
    { value: '#9b9b9b', label: ' two' },
    { value: '#c1c1c1', label: ' three' },
];
const sizeData = [
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' },
];

const EditDrawer = ({ t, open, toggleOpen }) => {
    const styles = useStyles();
    const [color, setColor] = React.useState(colorData[0].value);
    const [size, setSize] = React.useState(sizeData[0].value);
    const [sizeOptions, setSizeOptions] = React.useState(sizeData);

    const handleChangeColor = (val) => {
        if (val === '#c1c1c1') {
            setSizeOptions([]);
        } else {
            setSizeOptions(sizeData);
        }
        setColor(val);
    };

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
                    Product Name
                </Typography>

                <CustomRadio
                    label="Select color"
                    flex="row"
                    CustomItem={SelectColor}
                    value={color}
                    valueData={colorData}
                    onChange={handleChangeColor}
                    className={styles.selector}
                    classContainer={styles.center}
                />
                {sizeOptions === ''
                || sizeOptions.length <= 0
                || !sizeOptions ? (
                        // eslint-disable-next-line react/jsx-indent
                        <div className={styles.selector}>
                            <Typography
                                variant="label"
                                type="bold"
                                letter="uppercase"
                            >
                                Select Size
                            </Typography>
                            <Typography variant="p" className={styles.error}>
                                Sorry! This item is out of stock.
                            </Typography>
                        </div>
                    ) : (
                        <>
                            <CustomRadio
                                label="Select size"
                                flex="row"
                                CustomItem={SelectSize}
                                value={size}
                                valueData={sizeOptions}
                                onChange={setSize}
                                className={styles.selector}
                                classContainer={styles.center}
                            />
                            <Button variant="text">
                                <Typography
                                    variant="p"
                                    letter="capitalize"
                                    decoration="underline"
                                >
                                    {t('product:viewGuide')}
                                </Typography>
                            </Button>
                        </>
                    )}

                <Button
                    className={styles.toolbarButton}
                    onClick={toggleDrawer('bottom', false)}
                >
                    {t('cart:button:saveEdit')}
                </Button>
            </div>
        </SwipeableDrawer>
    );
};

export default EditDrawer;
