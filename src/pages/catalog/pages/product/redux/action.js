import { SET_SELECT_CONFIGURABLE } from './constan';

export const setConfigurable = (selected) => ({
    type: SET_SELECT_CONFIGURABLE,
    data: selected,
});

export default {
    setConfigurable,
};
