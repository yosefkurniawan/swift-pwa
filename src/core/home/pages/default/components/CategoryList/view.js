import SpanCategory from '@common_spancategory';
import useStyles from '../style';

const CategoryListView = (props) => {
    const styles = useStyles();
    return (
        <div className={styles.category}>
            <SpanCategory
                {...props}
            />
        </div>
    );
};

export default CategoryListView;
