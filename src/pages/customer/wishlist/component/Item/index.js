import PriceFormat from '@components/PriceFormat';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { GraphCustomer } from '@services/graphql';
import Message from '@components/Toast';
import Loading from '@components/Loaders/Backdrop';
import { getCartId } from '@helpers/cartId';
import useStyles from './style';
import { addSimpleProductsToCart } from '../../services/graphql';

export default ({
    price_range, price_tiers, __typename, imageSrc,
    name, wishlistId, token, t, refetch, sku,
}) => {
    const styles = useStyles();
    const [state, setState] = React.useState({
        loading: false,
        openMessage: false,
        textMessage: '',
        variantMessage: 'success',
    });
    const [removeWishlist] = GraphCustomer.removeWishlist(token);
    const [addToCart] = addSimpleProductsToCart(token);
    let cartId = '';

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }
    const handleToCart = () => {
        setState({
            ...state,
            loading: true,
        });
        addToCart({
            variables: {
                cartId,
                sku,
                qty: parseFloat(1),
            },
        }).then(() => {
            setState({
                ...state,
                loading: false,
                openMessage: true,
                variantMessage: 'success',
                textMessage: t('product:successAddCart'),
            });
            refetch();
        }).catch((e) => {
            setState({
                ...state,
                loading: false,
                openMessage: true,
                variantMessage: 'error',
                textMessage: e.message.split(':')[1] || t('product:failedAddCart'),
            });
        });
    };

    const handleRemove = () => {
        setState({
            ...state,
            loading: true,
        });
        removeWishlist({
            variables: {
                wishlistId,
            },
        })
            .then(() => {
                setState({
                    ...state,
                    loading: false,
                    openMessage: true,
                    variantMessage: 'success',
                    textMessage: t('customer:wishlist:removeSuccess'),
                });
                refetch();
            })
            .catch((e) => {
                setState({
                    ...state,
                    loading: false,
                    openMessage: true,
                    variantMessage: 'error',
                    textMessage: e.message.split(':')[1] || t('customer:wishlist:removeFailed'),
                });
            });
    };
    const handleOpenMessage = () => {
        setState({
            ...state,
            openMessage: false,
        });
    };
    return (
        <>
            <Loading open={state.loading} />
            <Message open={state.openMessage} variant={state.variantMessage} setOpen={handleOpenMessage} message={state.textMessage} />
            <div className={styles.card}>
                <img
                    src={imageSrc}
                    className={styles.cardImage}
                    alt={name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/img/placeholder.png';
                    }}
                />
                <div className={styles.content}>
                    <Typography variant="p">{name}</Typography>
                    <PriceFormat variant="p" priceRange={price_range} priceTiers={price_tiers} productType={__typename} />
                    <Button className={styles.btnAdd} onClick={handleToCart}>
                        <Typography variant="p" type="bold" letter="uppercase" color="white">
                            {t('customer:wishlist:addToBag')}
                        </Typography>
                    </Button>
                </div>
                <IconButton onClick={handleRemove}>
                    <Delete />
                </IconButton>
            </div>
        </>
    );
};
