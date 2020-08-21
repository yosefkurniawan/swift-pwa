/* eslint-disable arrow-body-style */
import Carousel from '@core/commons/carousel/';
import ItemFeatured from './Item';
import Grid from './grid';

const FeaturedBrands = (props) => {
    const { featured = [], t, desktop } = props;
    return (
        desktop ? <Grid data={featured} t={t} title={t('brands:featuredBrands')} /> : (
            <div className="hidden-desktop">
                <Carousel
                    title={t('brands:featuredBrands')}
                    data={featured}
                    item={ItemFeatured}
                />
            </div>
        )
    );
};

export default FeaturedBrands;
