#### Blog Module
# Detail Page Installation

## Use Default Pages Components
1. Make dynamic route under root `pages` 
    example `{pages}/blog/[id].js`
2. import default components on route file 
    example

    ```node
    import Page from '@modules/blog/default/Detail';

    export default Page;

    ```


## Use Custom Components

1. Make dynamic route under root `pages` 
    example `{pages}/blog/[id].js`
2. import default components on route file 
    example

    ```node
    import Page from '@pages/blog/detail';     //point to your custom page components

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
import CoreBase from '../core/Detail'; // import core base this must be uses
import DefaultContent from '../views/Details'; // import your content component
import Loader from '../views/Loader/LoaderDetail'; // import your Loader component
import WarningInfo from '../views/Info'; // import your warning alert or error component

const DetailPage = (props) => (
    <CoreBase
        Content={DefaultContent}
        Loader={Loader}
        WarningInfo={WarningInfo}
        {...props}
    />
);

DetailPage.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(DetailPage));


```

