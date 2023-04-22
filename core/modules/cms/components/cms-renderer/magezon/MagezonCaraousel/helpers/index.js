export const mapList = (list, owl_loop = false) => {
    if (owl_loop) {
        if (list && list.length && list.length < 3) {
            return [...list, ...list, ...list];
        }
        if (list && list.length && list.length < 5) {
            return [...list, ...list];
        }
    }
    return list;
};

export const validatePx = (prop) => {
    if (prop) {
        const tail = typeof prop !== 'string' ? String(prop).slice(-2) : prop.slice(-2);
        if (tail.toLowerCase() !== 'px') {
            return `${prop}px`;
        }
        return prop;
    }
    return 0;
};
