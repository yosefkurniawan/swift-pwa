import { Box, Slide } from '@material-ui/core';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Router from 'next/router';
import { formatPrice } from '@helpers/currency';
import TagManager from 'react-gtm-module';
import { storeConfigNameCokie } from '@config';
import cookies from 'js-cookie';
import useStyles from './style';

const CheckoutDrawer = ({ editMode, t, data }) => {
    const styles = useStyles();
    let storeConfig = {};
    if (typeof window !== 'undefined') {
        storeConfig = cookies.getJSON(storeConfigNameCokie);
    }

    const handleOnCheckoutClicked = () => {
        const dataLayer = {
            event: 'checkout',
            ecommerce: {
                actionField: { step: 1, option: '' },
                products: data.items.map(({ quantity, product, prices }) => ({
                    name: product.name,
                    id: product.sku,
                    price: prices.price.value,
                    category: product.categories.length > 0 ? product.categories[0].name : '',
                    list: product.categories.length > 0 ? product.categories[0].name : '',
                    quantity,
                })),
                currencyCode: storeConfig.base_currency_code || 'IDR',
            },
        };
        TagManager.dataLayer({
            dataLayer,
        });
        Router.push('/checkout');
    };
    return (
        <Slide direction="up" in={!editMode} mountOnEnter unmountOnExit>
            <Box
                position="fixed"
                bottom={0}
                left={0}
                display="flex"
                flexDirection="column"
                width="100%"
                justifyContent="center"
                className={styles.checkoutBox}
            >
                <Box align="center" padding={1}>
                    <Typography
                        variant="span"
                        type="bold"
                        align="center"
                        letter="capitalize"
                        className={styles.subtotal}
                    >
                        {t('common:subtotal')}
                    </Typography>
          &nbsp;
                    <Typography
                        variant="span"
                        type="bold"
                        align="center"
                        letter="capitalize"
                        className={styles.subtotal}
                    >
                        {formatPrice(data.prices.grand_total.value, data.prices.grand_total.currency)}
                    </Typography>
                </Box>
                <Box justifyContent="center" display="flex">
                    <Button
                        customRootStyle={{ width: 'fit-content' }}
                        className={styles.goToCheckout}
                        onClick={handleOnCheckoutClicked}
                    >
                        {t('common:button:checkout')}
                    </Button>
                </Box>
            </Box>
        </Slide>
    );
};

export default CheckoutDrawer;
