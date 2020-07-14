#### Blog Module
# Landing Page Installation

## Use Default Pages Components
1. Make route under root `pages` 
    example `{pages}/blog/index.js`
2. import default components on route file 
    example

    ```node
    import Page from '@modules/blog/default/Landing';

    export default Page;

    ```


## Use Custom Components

1. Make route under root `pages` 
    example `{pages}/blog/index.js`
2. import default components on route file 
    example

    ```node
    import Page from '@pages/blog/landing';     //point to your custom page components

    export default Page;

    ```

3. make you custom page compoents

### NOTE
if you wont to using custom component, make sure your components includes
connection graphql with `withApollo` and translataion `withTranslation` HOC.

##### example page components

```node
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import CoreBase from '../core/Landing'; // must import and uses core base
import DefaultContent from '../views/Landing';  //import your custom layout content
import Loader from '../views/Loader/LoaderList'; //import your loader component
import WarningInfo from '../views/Info'; // import your warning/ alert info eror component
import ContentCategory from '../views/ModalCategory'; // import your category list component
import ContentItem from '../views/Details'; // import your item list components

const Page = (props) => (
    <CoreBase
        Content={DefaultContent}
        ContentCategory={ContentCategory}
        ContentItem={ContentItem}
        Loader={Loader}
        WarningInfo={WarningInfo}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));


```
<br><br>

`Landing base compoents` throws additional props into the prop `Content` rendered on this core base

that prop : 

```node
t, handleLoadMore, loadMore, page, pageSize, loading, data, loadCategory

```

