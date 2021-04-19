import Core from './core';
import View from './view';

const SimpleOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default SimpleOptionItem;
