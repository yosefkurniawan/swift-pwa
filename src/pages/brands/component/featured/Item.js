import useStyles from './style';

const ItemFeatured = (props) => {
    const styles = useStyles();
    const { key } = props;
    console.log(props);
    return (
        <div key={key} className={styles.container}>ini item slider</div>
    );
};

export default ItemFeatured;
