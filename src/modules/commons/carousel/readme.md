# Commons Component Module Carousel

Carousel is module to create slider image on swift product

this component use some dependency and **required**, so you need to install

| Depedency   | Description | Type |
| :---        | :---        |:---  |
| react-swipeable-views | depedency swipable| external dependency |
| Typography   | commons components typography generator | internal dependency |

## Usage

**Import module to your component**
````
import Carousel from '{path modules}/commons/Carousel';
````
**Usage**

````
<Carousel
    title={ // your title }
    data={[1,2,3]}
    item={// your Item}
/>
````

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| title       | false    | head title carousel | string |
| data        | true     | data to generate | array |
| item        | true     | view react component | Component |

