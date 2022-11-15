/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useStyles from '@core_modules/brands/pages/default/components/featured/style';
import Link from 'next/link';

const ItemFeatured = (props) => {
    const styles = useStyles();
    const {
        key, logo, name, category_url, is_active,
    } = props;
    return (
        <>
            {is_active === 1 ? (
                <>
                    {category_url ? (
                        <Link href="/[...slug]" as={category_url}>
                            <a
                                key={key}
                                className={styles.container}
                            >
                                <img className={styles.imgBrand} src={logo} alt={name} />
                            </a>
                        </Link>
                    ) : (
                        <div
                            key={key}
                            className={styles.container}
                        >
                            <img className={styles.imgBrand} src={logo} alt={name} />
                        </div>
                    )}
                </>
            ) : null}
        </>
    );
};

export default ItemFeatured;
