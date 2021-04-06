import { modules } from '@config';
import gqlService from '../../../../services/graphql';

const OrderComment = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        handleOpenMessage,
        formik,
        OrderCommentView,
    } = props;
    const [addOrderComment] = gqlService.addOrderComment({ onError: () => { } });
    const [removeOrderComment] = gqlService.removeOrderComment({ onError: () => { } });
    const handleOrderComment = async () => {
        let data;
        const state = {
            ...checkout,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: true,
                extraFee: false,
                order: true,
            },
        };
        state.loading.orderComment = true;
        setCheckout(state);
        const cartId = state.data.cart.id;

        if (!state.data.order_comment) {
            const result = await addOrderComment({
                variables: {
                    cartId,
                    orderComment: formik.values.orderComment,
                },
            });

            if (result && result.data && result.data.addOrderComment) {
                data = {
                    ...state.data,
                    ...result.data.addOrderComment,
                };

                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:orderCommentAdded'),
                });
            }
        } else {
            const result = await removeOrderComment({
                variables: {
                    cartId,
                },
            });
            if (result && result.data && result.data.removeOrderComment) {
                data = {
                    ...state.data,
                    ...result.data.removeOrderComment,
                };

                formik.setFieldValue('orderComment', '');

                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:orderCommentRemoved'),
                });
            }
        }

        state.loading.orderComment = false;

        if (data) {
            state.data = data;
        }

        const finalState = {
            ...state,
            loading: {
                ...checkout.loading,
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
            },
        };
        setCheckout(finalState);
    };

    if (modules.checkout.orderComment.enabled) {
        return (
            <OrderCommentView
                handleOrderComment={handleOrderComment}
                formik={formik}
                disabled={checkout.loading.orderComment || !!checkout.data.order_comment}
                loading={checkout.loading.orderComment}
                hasData={checkout.data.order_comment}
            />
        );
    }

    return null;
};

export default OrderComment;
