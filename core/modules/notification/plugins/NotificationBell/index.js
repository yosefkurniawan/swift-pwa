/* eslint-disable react/require-default-props */
import propTypes from 'prop-types';
import Core from './core';
import Content from './components';

const NotificationBell = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

NotificationBell.propTypes = {
    withLink: propTypes.bool,
};

export default NotificationBell;
