/* eslint-disable react/require-default-props */
import propTypes from 'prop-types';
import Core from './core';
import WihtLinkView from './components/WithLink';
import WithoutLinkView from './components/WithoutLink';

const ShoppingBag = (props) => (
    <Core
        WihtLinkView={WihtLinkView}
        WithoutLinkView={WithoutLinkView}
        {...props}
    />
);

ShoppingBag.propTypes = {
    withLink: propTypes.bool,
};

export default ShoppingBag;
