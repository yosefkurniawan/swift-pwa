import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import { modules } from '@config';
import useStyles from '../style';

const CarouselProductSkeleton = () => {
    const SliderSkeleton = () => (
        <>
            <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                xsStyle={{ height: '60vw', marginBottom: '8px' }}
                smStyle={{ height: '42vw' }}
                mdStyle={{ height: '200px' }}
            />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="75%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="20%" animation="wave" />
        </>
    );
    return (
        <div style={{ padding: '24px 0 12px 0', width: '100%' }}>
            <Grid container>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 6px 0 12px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={6} sm={4} md={3} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item md={3} display={{ xs: 'none', sm: 'none' }} style={{ padding: '0 12px 0 6px' }}>
                    <SliderSkeleton />
                </Grid>
            </Grid>
        </div>
    );
};

const CategoryListSkeleteon = () => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const { categoryList } = modules.home;
    const width = desktop
        ? categoryList.imageSize.desktop.width
        : categoryList.imageSize.mobile.width;
    const height = desktop
        ? categoryList.imageSize.desktop.height
        : categoryList.imageSize.mobile.height;
    return (
        <div className={styles.skeletonWrapper}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <div
                    className={classNames(
                        'col-xs-12 row between-lg',
                        styles.featuresBox,
                    )}
                    style={{ width: '85%' }}
                >

                    <div
                        className={classNames(
                            'col-xs-12 col-sm-12 col-lg-4 hidden-mobile',
                            styles.imgFeaturedContainer,
                        )}
                    >
                        <div className={styles.imgFeaturedItem}>
                            <Skeleton height={height} width={width} variant="rect" />
                        </div>
                    </div>

                    <div
                        className={classNames(
                            'col-xs-12 col-sm-12 col-lg-8',
                        )}
                    >
                        <div className={classNames('row center-xs', styles.contentFeatured)}>
                            <div
                                className={classNames('col-xs-12', styles.contentMobileFeatured)}
                            >
                                <CarouselProductSkeleton />
                            </div>
                            <div className={classNames('col-xs-12')}>
                                <div className={styles.footerFeatured}>
                                    <Skeleton height={45} width={150} variant="rect" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </div>
    );
};

export default CategoryListSkeleteon;
