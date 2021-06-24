import { useMutation } from '@apollo/client';

import * as Schema from '@core_modules/paypal/services/graphql/schema';

export const setPaypalPaymentMethod = () => useMutation(Schema.default, {
    context: {
        request: 'internal',
    },
});

export default { setPaypalPaymentMethod };
