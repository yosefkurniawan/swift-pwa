import Cookies from 'js-cookie';
import { nameCartId } from '@config';
import { GraphCart } from '@services/graphql';

export default () => {
    const localData = Cookies.get(nameCartId);
    if (localData) {
        return localData;
    }
    const [getCartId] = GraphCart.getGuestCartId();
    return getCartId()
        .then((res) => {
            const token = res.data.createEmptyCart;
            Cookies.set(nameCartId, token, { expires: 24 });
            return token;
        })
        .catch((e) => console.log(e));
};
