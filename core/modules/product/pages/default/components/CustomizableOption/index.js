/* eslint-disable no-underscore-dangle */
import React from 'react';
import Content from './components';
import Core from './core';

const CustomizableOption = (props) => (
    <Core
        {...props}
        Content={Content}
    />
);

export default CustomizableOption;
