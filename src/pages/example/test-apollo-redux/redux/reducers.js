export const initExampleState = {
    test: 'lorem ipsum',
};

export const exampleReducer = (state = initExampleState, action) => {
    switch (action.type) {
    case 'SET_TEST':
        return {
            ...state,
            test: action.text,
        };
    default:
        return state;
    }
};
