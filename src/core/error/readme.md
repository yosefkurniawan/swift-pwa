# Description

This is a error module that handle display error page.

# How to install
## 1 import reward point module and place on your routing

````
import Page from '@core/error/pages/default';

export default Page;
````

# Components
## Properties
### 1. Default

| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageConfig  | false    | object configuration page layout      | Object|

### 2. core
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| statusCode  | true    | object status error | Component |
| Content     | true     | views component, you can use default component or custom | Component |