/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import Typography from '@components/Typography';
import Button from '@components/Button';
import Radio from '@components/Forms/Radio';
import TextField from '@components/Forms/TextField';
import classNames from 'classnames';
import DeliveryItem from './RadioDeliveryItem';

import useStyles from '../style';
import Summary from './Summary';
import PaymentList from './PaymentList';

const deliveryData = [
    { label: 'Standart', value: { name: 'standart', price: 20000 } },
    { label: 'Express', value: { name: 'express', price: 35000 } },
];

const FieldPoint = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    action,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.fieldPoinContainer}>
            <TextField value={value} onChange={onChange} placeholder={placeholder} />
            <Button variant="outlined" className={styles.btnAplly} onClick={action}>
                <Typography variant="p" type="bold" letter="uppercase">
                    Aplly
                </Typography>
            </Button>
        </div>
    );
};

const Checkout = (props) => {
    const { t } = props;
    const styles = useStyles();
    const [delivery, setDelivery] = React.useState([]);
    const [summary, setSummary] = React.useState([
        { item: 'sub total', value: 300000 },
    ]);

    const [point, setPoint] = React.useState(100000);
    const [credit, setCredit] = React.useState(100000);

    const handleAddres = () => {};
    const handleShipping = (val) => {
        setDelivery(val);
        let include = false;
        const newData = [];
        summary.forEach((item) => {
            if (item.item === 'shipping') {
                include = true;
                // eslint-disable-next-line no-param-reassign
                item.value = val.price;
            }
            newData.push(item);
        });

        include === false
            ? setSummary([...newData, { item: 'shipping', value: val.price }])
            : setSummary(newData);
    };
    const handlePayment = () => {};
    const handlePromo = () => {
        let include = false;
        const newData = [];
        summary.forEach((item) => {
            if (item.item === 'promo') {
                include = true;
                // eslint-disable-next-line no-param-reassign
                item.value = -20000;
            }
            newData.push(item);
        });

        include === false
            ? setSummary([...newData, { item: 'promo', value: -20000 }])
            : setSummary(newData);
    };
    const handleGift = () => {
        let include = false;
        const newData = [];
        summary.forEach((item) => {
            if (item.item === 'gift') {
                include = true;
                // eslint-disable-next-line no-param-reassign
                item.value = -30000;
            }
            newData.push(item);
        });

        include === false
            ? setSummary([...newData, { item: 'gift', value: -30000 }])
            : setSummary(newData);
    };
    const handleCheckBalance = () => {};
    const handleUsePoint = async () => {
        if (point !== 0) {
            let include = false;
            const newData = [];
            summary.forEach((item) => {
                if (item.item === 'point') {
                    include = true;
                    // eslint-disable-next-line no-param-reassign
                    item.value = -point;
                }
                newData.push(item);
            });

            include === false
                ? await setSummary([...newData, { item: 'point', value: -point }])
                : await setSummary(newData);

            setPoint(0);
        }
    };
    const handleUseCredit = async () => {
        if (credit !== 0) {
            let include = false;
            const newData = [];
            summary.forEach((item) => {
                if (item.item === 'credit') {
                    include = true;
                    // eslint-disable-next-line no-param-reassign
                    item.value = -credit;
                }
                newData.push(item);
            });

            include === false
                ? await setSummary([...newData, { item: 'credit', value: -credit }])
                : await setSummary(newData);

            setCredit(0);
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.block}>
                    <div className={styles.addressContainer}>
                        <div className={styles.addressText}>
                            <Typography variant="title" type="bold" letter="uppercase">
                                {t('checkout:shippingAddress')}
                            </Typography>
                            <Typography variant="p">
                                Diasty Jl Kalibata Timur I no.1 rt.01/rw.01 Pancoran, Jakarta
                                Selatan 12740 081234567890
                            </Typography>
                        </div>
                        <Button variant="outlined">
                            <Typography variant="p" type="bold" letter="uppercase">
                                {t('common:button:change')}
                            </Typography>
                        </Button>
                    </div>
                </div>
                <div className={styles.block}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:deliveryMethod')}
                    </Typography>
                    <Radio
                        value={delivery}
                        onChange={handleShipping}
                        classContainer={styles.listShipping}
                        CustomItem={DeliveryItem}
                        valueData={deliveryData}
                    />
                </div>
                <div className={styles.block}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:payment')}
                    </Typography>
                    <Typography variant="p">{t('checkout:paymentSubtitle')}</Typography>
                    <PaymentList />
                </div>
                <div className={classNames(styles.block, styles.rmBorder)}>
                    <FieldPoint placeholder="Promo Code" action={handlePromo} />
                    <FieldPoint placeholder="Gift Card Number" action={handleGift} />
                    <Button variant="text" className={styles.btnBalanceGift}>
                        <Typography variant="p" decoration="underline" letter="capitalize">
                            Check Balance
                        </Typography>
                    </Button>
                    <div className={styles.cardPoint}>
                        <div className="column">
                            <Typography variant="span" letter="capitalize">
                                My Point
                            </Typography>
                            <Typography
                                variant="title"
                                type="bold"
                                className={styles.pointText}
                            >
                                {point.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            className={styles.btnPoint}
                            onClick={handleUsePoint}
                        >
                            <Typography variant="p" type="bold" letter="uppercase">
                                USE MY POIN
                            </Typography>
                        </Button>
                    </div>
                    <div className={styles.cardPoint}>
                        <div className="column">
                            <Typography variant="span" letter="capitalize">
                                My Credit
                            </Typography>
                            <Typography
                                variant="title"
                                type="bold"
                                className={styles.pointText}
                            >
                                {credit.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            className={styles.btnPoint}
                            onClick={handleUseCredit}
                        >
                            <Typography
                                variant="p"
                                type="bold"
                                letter="uppercase"
                                align="center"
                            >
                                use my credit
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
            <Summary {...props} data={summary} />
        </div>
    );
};

export default Checkout;
