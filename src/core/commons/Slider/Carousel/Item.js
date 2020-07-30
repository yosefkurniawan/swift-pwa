import dynamic from 'next/dynamic';
import useStyles from './style';

const ProductItem = dynamic(() => import('@common_productitem'));

const Item = (props) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <ProductItem
                {...props}
                variants={[]}
                configurable_options={[]}
            />
        </div>
    );
};

export default Item;
