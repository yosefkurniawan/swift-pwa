import Core from './core';
import View from './view';

const ConfigurableOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default ConfigurableOptionItem;
