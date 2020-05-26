const schema = `
    enum CurrencyEnum {
        AFN
        ALL
        AZN
        DZD
        AOA
        ARS
        AMD
        AWG
        AUD
        BSD
        BHD
        BDT
        BBD
        BYR
        BZD
        BMD
        BTN
        BOB
        BAM
        BWP
        BRL
        GBP
        BND
        BGN
        BUK
        BIF
        KHR
        CAD
        CVE
        CZK
        KYD
        GQE
        CLP
        CNY
        COP
        KMF
        CDF
        CRC
        HRK
        CUP
        DKK
        DJF
        DOP
        XCD
        EGP
        SVC
        ERN
        EEK
        ETB
        EUR
        FKP
        FJD
        GMD
        GEK
        GEL
        GHS
        GIP
        GTQ
        GNF
        GYD
        HTG
        HNL
        HKD
        HUF
        ISK
        INR
        IDR
        IRR
        IQD
        ILS
        JMD
        JPY
        JOD
        KZT
        KES
        KWD
        KGS
        LAK
        LVL
        LBP
        LSL
        LRD
        LYD
        LTL
        MOP
        MKD
        MGA
        MWK
        MYR
        MVR
        LSM
        MRO
        MUR
        MXN
        MDL
        MNT
        MAD
        MZN
        MMK
        NAD
        NPR
        ANG
        YTL
        NZD
        NIC
        NGN
        KPW
        NOK
        OMR
        PKR
        PAB
        PGK
        PYG
        PEN
        PHP
        PLN
        QAR
        RHD
        RON
        RUB
        RWF
        SHP
        STD
        SAR
        RSD
        SCR
        SLL
        SGD
        SKK
        SBD
        SOS
        ZAR
        KRW
        LKR
        SDG
        SRD
        SZL
        SEK
        CHF
        SYP
        TWD
        TJS
        TZS
        THB
        TOP
        TTD
        TND
        TMM
        USD
        UGX
        UAH
        AED
        UYU
        UZS
        VUV
        VEB
        VEF
        VND
        CHE
        CHW
        XOF
        WST
        YER
        ZMK
        ZWD
        TRY
        AZM
        ROL
        TRL
        XPF
    }

    type Money {
        currency: CurrencyEnum
        value: Float
      }

    type DiscountProduct {
        amount_off: Float
        percent_off: Float
    }

    type Taxes {
        amount : Money
        label: String
      }

    type ProductPrice {
        discount: DiscountProduct
        regular_price: Money
        final_price: Money
        fixed_product_taxes: Taxes
    }

    type PriceRange {
        maximum_price: ProductPrice
        minimum_price: ProductPrice
        final_price: ProductPrice
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
    
    type CategoryInterface {
        name: String
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
        attribute_set_id: Int
        image: ProductImage
        typename: String
        categories: CategoryInterface
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
        categories: [CategoryInterface]
    }
`;

module.exports = schema;
