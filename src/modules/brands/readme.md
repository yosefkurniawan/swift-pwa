# Description

This is a brand module that is used to display selected brands and brand lists.

# How to install
First, enable your module on swift config with key ````brands````

copy `brands.json` under locales folder and paste tp `static/locales` en and id

Module brands can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules

## Use default template and no overide
### import Brands module and place on your routing
````
import Page from '../src/modules/brands/default';

export default Page;

````

## Use ustom template or overide logic
### 1. import core brand module

````
import Brand from '../../modules/brands/core';
````

### 2. if not all custom you can import component on module

````
// for example skeleton not overide and use default template

import Skeleton from '../../modules/brands/views/skeleton';
````
### 3. create your custom template
### 4. import your template
### 5. Place it in your page
#### example code
````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Brand from '../../modules/brands/base';

// your custom template import
import Content from './template';

import Skeleton from '../../modules/brands/views/skeleton';

// sample overide function
import generateAllData from './models/generateAllData';

const BrandsPage = (props) => (
    // generate brands page from module
    <Brand {...props} Content={Content} Skeleton={Skeleton} generateAllData={generateAllData} />
);

BrandsPage.getInitialProps = async () => ({
    namespacesRequired: ['brands'],
});

export default withApollo({ ssr: true })(withTranslation()(BrandsPage));

````

### Note
#### * withapollo and withtranslation must be place on first routing for peformance

# Components
### 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  |  false   | object configuration page layout      | Object|


### 2. Core
#### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| Content      |  true    | views component, you can use default component or custom | Component |
| Skeleton      |  true    |  views component, you can use default component or custom | Component |
| pageConfig  |  false   | object configuration page layout      | Object|
| generateAllData  |  false   | function to generate all data array      | Function|

## Override Function
#### generateAllData
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

## Override Config
### pageConfig

````
const pageConfig = {
    headerBackIcon: 'arrow', // available values: "close", "arrow",
    // you can add some here
};
````
# Properties sent to the component
1. all
````
    all: Object with all data brands and grouping
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

````
2. featured
````
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

3 some properties from swift app example ````t or translation ````

# Default Template
1. Featured Brands `{path module}/views/featured/index`
2. List All Brands with grouping `{path module}/views/all`
3. Complete All Brands View `{path module}/views/index`
4. Skeleton Loading `{path module}/views/skeleton`

