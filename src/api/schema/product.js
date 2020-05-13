const schema = `
    type Money {
        currency: String!
        value: Float!
    }

    type DiscountProduct {
        amount_off: Float
        percent_off: Float
    }

    type ProductPrice {
        discount: DiscountProduct
        regular_price: Money
        final_price: Money
    }

    type PriceRange {
        maximum_price : ProductPrice
        minimum_price : ProductPrice
        final_price : ProductPrice
    }

    type PriceTiers {
        discount: DiscountProduct
        final_price: Money
        quantity: Int
    }

    type ProductImage {
        url: String
        label: String
    }
    
    type ProductInterface {
        id: String
        name: String
        url_key: String
        sku: String
        stock_status: String
        small_image: ProductImage
        price_tiers: PriceTiers
        price_range:PriceRange
        thumbnail: ProductImage
    }

    type Product {
        id: String
        name: String
        url_key: String
        sku: String
        stock_status: String
        crosssell_products: [ProductInterface]!
        price_tiers: PriceTiers
        price_range:PriceRange
        small_image: ProductImage
        thumbnail: ProductImage
    }
`;

module.exports = schema;
