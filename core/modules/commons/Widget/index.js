import React from 'react';

import { getCmsPage } from '@core_modules/cms/services/graphql';

const Widget = ({ identifier }) => {
    const { data } = getCmsPage({ identifier });
    return <div>{JSON.stringify(data)}</div>;
};

export default Widget;
