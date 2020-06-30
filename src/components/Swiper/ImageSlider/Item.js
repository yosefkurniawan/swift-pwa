import ProductItem from '@components/ProductItem';

const Item = (props) => (
    <>
        <div className="item-container">
            <ProductItem
                {...props}
                variants={[]}
                configurable_options={[]}
            />
        </div>

        <style jsx>
            {`
                .item-container {
                    padding: 0 8px,
                    margin: 0px !important,
                    height: 100%,
                    overflow: hidden,
                    width: 60vw,
                    
                }
                @media screen and (min-width: 600px) {
                    .item-container {
                        width: 300px;
                    }
                }
                @media screen and (min-width: 960px) {
                    .item-container {
                        width: 270px;
                    }
                }
            `}
        </style>
    </>
);

export default Item;
