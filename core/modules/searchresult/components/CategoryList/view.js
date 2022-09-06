/* eslint-disable no-plusplus */
import Button from '@common_button';
import Link from '@material-ui/core/Link';
import useStyles from '@core_modules/searchresult/components/style';
import Skeleton from '@material-ui/lab/Skeleton';

const CategoryItem = (props) => {
    const styles = useStyles();
    const { name, breadcrumbs, url_key } = props;
    let breadcrumbsText = '';
    if (breadcrumbs) {
        for (let i = 0; i < breadcrumbs.length; i++) {
            const element = breadcrumbs[i];
            breadcrumbsText += `${element.category_name} > `;
        }
    }
    return (
        <>
            <Link href={`/${url_key}`}>
                <div className="hidden-mobile">
                    <div className={styles.listContainerCategory}>
                        {breadcrumbsText === '' ? (
                            <div className={styles.titleCategory}>{name}</div>
                        ) : (
                            <>
                                <div className={styles.breadcrumbs}>{breadcrumbsText}</div>
                                <div className={styles.titleCategory}>{name}</div>
                            </>
                        )}
                    </div>
                </div>
                <div className="hidden-desktop">
                    <div className={styles.listContainerCategoryMobile}>
                        <div className={styles.breadcrumbsMobile}>{breadcrumbsText}</div>
                        <div className={styles.titleCategory}>{name}</div>
                    </div>
                </div>
            </Link>
        </>
    );
};

const CategoryView = (props) => {
    const {
        slice, data, loadMore, loading,
    } = props;
    const styles = useStyles();

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.topTitle}>
                    Category
                </div>
                {loading && (
                    <>
                        <div className="hidden-mobile">
                            {[1, 2, 3, 4].map((idx) => (
                                <div className={styles.listContainerCategory}>
                                    <Skeleton key={idx} variant="text" width="20%" height={30} />
                                </div>
                            ))}
                        </div>
                        <div className="hidden-desktop">
                            {[1, 2, 3, 4].map((idx) => (
                                <div className={styles.listContainerCategoryMobile}>
                                    <Skeleton key={idx} variant="text" width="20%" height={30} />
                                    <Skeleton key={idx} variant="text" width="40%" height={30} />
                                </div>
                            ))}
                        </div>

                    </>
                )}
                {slice && (
                    <>
                        {slice.map((item) => (
                            <CategoryItem {...item} />
                        ))}
                    </>
                )}
            </div>
            <div>
                {data.length > slice.length ? (
                    <Button
                        align="left"
                        color="primary"
                        onClick={() => loadMore()}
                        style={{ margin: 10, fontSize: 8 }}
                    >
                        Load More
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default CategoryView;
