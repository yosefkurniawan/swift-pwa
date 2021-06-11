import Core from '@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed/core';
import View from '@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed/view';
import React from 'react';

const MagezonInstagramFeed = (props) => (
    <Core
        View={View}
        {...props}
    />
);

export default MagezonInstagramFeed;
