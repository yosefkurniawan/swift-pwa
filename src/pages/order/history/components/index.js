import useStyles from './style';
import Item from './item';

const data = [
    {
        order_number: 'ID01234567890',
        status: 'shipping',
    },
    {
        order_number: 'ID01234567890',
        status: 'pending',
    },
    {
        order_number: 'ID01234567890',
        status: 'complete',
    },
];

const OrderPage = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            {
                data.map((item, index) => (
                    <Item key={index} {...item} />
                ))
            }
        </div>
    );
};

export default OrderPage;
