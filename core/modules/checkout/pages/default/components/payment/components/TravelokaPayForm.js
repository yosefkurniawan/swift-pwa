/* eslint-disable jsx-a11y/iframe-has-title */
import Typography from '@common_typography';
import TextField from '@common_textfield';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useState } from 'react';
// import Modal from '@material-ui/core/Modal';
// import _debounce from 'lodash/debounce';
// import Xendit from 'xendit-node';
// import useTravelokaPay from '@core_modules/checkout/helpers/useTravelokaPay';
// import Traveloka3DSModal from './Traveloka3DSModal';

const TravelokaPayForm = (props) => {
    // prettier-ignore
    const {
        // payment_travelokapay_bin_whitelist, payment_travelokapay_public_key, payment_travelokapay_user_id, checkout,
        travelokaPayRef,
    } = props;
    // const [cardData, setCardData] = useState();
    // const { cardToken, setCardToken, handleTravelokaPay, open: openTraveloka, setOpen: setOpenTraveloka, handleClose } = useTravelokaPay();
    // const travelokaPayDialogRef = useRef(null);

    // const initXenditService = () => {
    //     const x = new Xendit({ secretKey: payment_travelokapay_public_key });
    //     const { Card } = x;
    //     const options = {};
    //     const card = new Card(options);

    //     return card;
    // };
    // // console.log('cardToken', cardToken);

    // const xenditService = useMemo(() => initXenditService, []);

    // prettier-ignore
    const validationSchema = Yup.object().shape({
        name: Yup.string().nullable().required(),
        cardNumber: Yup
            .string().nullable().required()
            .matches(/^[0-9]+$/, 'Card number is invalid') // digit only
            .min(16, 'Card number is invalid')
            .max(16, 'Card number is invalid'),
        expiryDate: Yup.string().nullable().required(),
        cvv: Yup.string().nullable().required(),
    });
    // const validationSchema = Yup.object().shape({
    //     name: Yup.string().nullable(),
    //     cardNumber: Yup.string().nullable(),
    //     expiryDate: Yup.string().nullable(),
    //     cvv: Yup.string().nullable(),
    // });

    const formik = useFormik({
        initialValues: {
            name: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
        validationSchema,
        onSubmit: () => {
            // console.log(values);
            // window.Xendit.setPublishableKey(payment_travelokapay_public_key);
            travelokaPayRef.current = formik;

            // console.log(xenditService());
            // handleTravelokaPay();

            // 61aece8dc465bf001b20c207 -> token

            // xenditService()
            //     .createCharge({
            //         tokenID: cardToken,
            //         externalID: window.btoa('testing'),
            //         amount: '10000',
            //         forUserID: payment_travelokapay_user_id,
            //     })
            //     .then((res) => {
            //         console.log(res);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        },
    });

    // useEffect(() => {
    //     if (!travelokaPayRef.current) {
    //         console.log('hello');
    //         // eslint-disable-next-line no-param-reassign
    //         travelokaPayRef.current = formik;
    //     }
    // }, [travelokaPayRef]);

    if (!travelokaPayRef.current) {
        travelokaPayRef.current = formik;
        // travelokaPayRef.current.customValidate = formik.validateForm;
    }

    // console.log('currency', checkout?.data?.cart?.prices?.grand_total?.currency);
    // console.log('checkout', checkout);
    // console.log('props', props);

    // const handleChangeCardNumber = (e) => {
    //     const { value } = e.target;
    //     console.log(value);
    //     formik.setFieldValue('cardNumber', value);
    //     debouncedCardNumber(value);
    // };

    // const debouncedCardNumber = useCallback(
    //     _debounce((value) => {
    //         console.log(value);
    //         if (!window.Xendit.card.validateCardNumber(value)) {
    //             formik.setFieldError('cardNumber', 'Card number is invalid');
    //             console.log('hi');
    //         }
    //         // if (!window.Xendit.card.validateCardNumber(cardNumber)) {
    //         //     formik.setFieldError('cardNumber', 'Card number is invalid');
    //         // }
    //     }, 1000),
    //     []
    // );

    // const customValidate = () => {
    //     formik.validateForm();
    // };

    const handleChangeInput = (field, value) => {
        travelokaPayRef.current.values[field] = value;
        formik.setFieldValue(field, value);
    };

    return (
        <>
            <div className="travelokapay-form" style={{ marginLeft: '2rem' }}>
                <Typography>Enter your payment details:</Typography>
                <form>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            className="textfield"
                            name="name"
                            placeholder="Name on Card"
                            value={formik.values.name}
                            onChange={(e) => handleChangeInput('name', e.target.value)}
                            error={!!(formik.touched.name && formik.errors.name)}
                            errorMessage={(formik.touched.name && formik.errors.name) || null}
                        />
                        <TextField
                            className="textfield"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={formik.values.cardNumber}
                            onChange={(e) => handleChangeInput('cardNumber', e.target.value)}
                            error={!!(formik.touched.cardNumber && formik.errors.cardNumber)}
                            errorMessage={(formik.touched.cardNumber && formik.errors.cardNumber) || null}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            className="textfield"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formik.values.expiryDate}
                            onChange={(e) => {
                                let { value } = e.target;

                                if (value.length > 5) {
                                    return;
                                }
                                if (value.length === 2 && formik.values.expiryDate.length === 1) {
                                    value += '/';
                                } else if (value.length === 2 && formik.values.expiryDate.length === 3) {
                                    value = value.substring(0, value.length - 1);
                                }
                                handleChangeInput('expiryDate', value);
                            }}
                            error={!!(formik.touched.expiryDate && formik.errors.expiryDate)}
                            errorMessage={(formik.touched.expiryDate && formik.errors.expiryDate) || null}
                        />
                        <TextField
                            className="textfield"
                            name="cvv"
                            placeholder="CVV"
                            value={formik.values.cvv}
                            onChange={(e) => handleChangeInput('cvv', e.target.value)}
                            error={!!(formik.touched.cvv && formik.errors.cvv)}
                            errorMessage={(formik.touched.cvv && formik.errors.cvv) || null}
                        />
                    </div>
                    {/* <button type="button" onClick={formik.handleSubmit}>
                        Submit
                    </button> */}
                </form>
            </div>
            {/* <Traveloka3DSModal
                open={openTraveloka}
                setOpen={setOpenTraveloka}
                handleClose={handleClose}
            /> */}
        </>
    );
};

export default TravelokaPayForm;
