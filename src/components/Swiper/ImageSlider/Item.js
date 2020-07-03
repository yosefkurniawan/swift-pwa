import ProductItem from '@components/ProductItem';

const Item = (props) => (
    <div>
        <div className="item-carousel">
            <ProductItem
                {...props}
                variants={[]}
                configurable_options={[]}
            />
        </div>

        <style jsx>
            {`
                .item-carousel {
                    height: 100%;
                    overflow: hidden;
                    width: 60vw;
                }
                @media screen and (min-width: 600px) {
                    .item-carousel {
                        width: 200px;
                        height: 100%;
                        overflow: hidden;
                    }
                }
                @media screen and (min-width: 960px) {
                    .item-carousel {
                        width: 270px;
                        height: 100%;
                    }
                }
            `}
        </style>
    </div>
);

export default Item;
