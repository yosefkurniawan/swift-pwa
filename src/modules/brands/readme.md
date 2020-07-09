# Brands Features

This is a brand module that is used to display selected brands and brand lists.

# How to install
First, enable your module on swift config with key ````brands````

Module brands can be installed with custom template or default template
if you don't need custom, you can import it directly from the default modules

### Usage
````
import Layout from '../src/components/Layouts';
import Brands from '../src/modules/brands/default';

const Page = () => <Brands Layout={Layout} />;

export default Page;

````


if you need to custom template or overide logic you can import module and default component place to your pages file,

### Usage

````
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Layout from '@components/Layouts';
import Brand from '../../modules/brands/base';
// import Content from '../../modules/brands/components/index';
import Content from './template';
import Skeleton from '../../modules/brands/views/skeleton';

// sample overide function
import generateAllData from './models/generateAllData';

const BrandsPage = (props) => (
    <Brand {...props} Layout={Layout} Content={Content} Skeleton={Skeleton} generateAllData={generateAllData} />
);

BrandsPage.getInitialProps = async () => ({
    namespacesRequired: ['brands'],
});

export default withApollo({ ssr: true })(withTranslation()(BrandsPage));

````

# Components
### 1. Default
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| Layout      |  true    | component layout base of project | Component |
| pageConfig  |  false   | object configuration page layout      | Object|


### 2. Base
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| Content      |  true    | views component, you can use default component or custom | Component |
| Skeleton      |  true    |  views component, you can use default component or custom | Component |
| pageConfig  |  false   | object configuration page layout      | Object|
| generateAllData  |  false   | object configuration page layout      | Function|
| Layout      |  required    | component layout base of project | Component |


### example generateAllData
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

### example pageConfig configuration
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

### Default Template
1. Featured Brands `{path module}/views/featured/index`
2. List All Brands with grouping `{path module}/views/all`
3. Complete All Brands View `{path module}/views/index`
4. Skeleton Loading `{path module}/views/skeleton`

