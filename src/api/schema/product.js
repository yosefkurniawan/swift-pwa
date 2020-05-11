const schema = `
    type Money {
        currency: String!
        value: Float!
    }

    type ProductPrice {
        regular_price: Money
        final_price: Money
    }

    type PriceRange {
        maximum_price : ProductPrice
        final_price : ProductPrice
    }

    type ProductImage {
        url: String
        label: String
    }
    
    type ProductInterface {
        id: String
        name: String
        url_key: String
        price_range:PriceRange
        small_image: ProductImage
    }

    type Product {
        id: String
        name: String
        url_key: String
        crosssell_products: [ProductInterface]!
        price_range:PriceRange
        small_image: ProductImage
    }
`;

module.exports = schema;
