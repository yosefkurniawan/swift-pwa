## Brands Features

This is a brand module that is used to display selected brands and brand lists.

### How to install

import module and default component place to your pages,

````
import Skeleton from '../../modules/brands/views/skeleton';
import Content from '../../modules/brands/components/index';

<Brand {...props} Content={Content} Skeleton={Skeleton} />
````

### Properties
1. Content **(Required)** : views component, you can use default component or custom
    ````
        all: Object withall data brands and grouping
            example:
            [
                {
                    group: "Z",
                    children: {
                        attribute_id: 5650,
                        category_url: "brands/zara.html",
                        is_active: 1,
                        logo: "https://swiftpwa-be.testingnow.me/media/brand/z/a/zara.png",
                        name: "Zara",
                        sort_order: 0,
                        __typename: "BrandItems",
                    }
                    
                }
            ]


        featured: Array list featured brands
            example:
            [
                {
                    attribute_id: 5643,
                    category_url: "brands/adidas.html",
                    is_active: 1,
                    logo: "https://swiftpwa-be.testingnow.me/media/brand/a/d/adidas.jpg",
                    name: "Adidas",
                    sort_order: 0
                }
            ]
            
    ````
2. Skeleton **(Required)**: views component, you can use default component or custom
3. generateAllData (Optional): function to overide generate all data, you can
    - @params array list data brands
    - @return array list with grouping data

    example:
    ````
        const generateAllData = (data = []) => {
            // you can modify data here
        }
    ````

    return data must be like this:
    
    ````
    [
        {
            group: "Z",
            children: {
                attribute_id: 5650,
                category_url: "brands/zara.html",
                is_active: 1,
                logo: "https://swiftpwa-be.testingnow.me/media/brand/z/a/zara.png",
                name: "Zara",
                sort_order: 0,
                __typename: "BrandItems",
            }
            
        }
    ]
    ````

### Default Component
1. Full Content `{path module}/views/index`
2. Featured Brands `{path module}/views/featured/index`
3. List All Brands with grouping `{path module}/views/all`

