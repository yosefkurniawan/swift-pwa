/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const getProductListConditions = (conditions) => {
    const parsedConditions = JSON.parse(conditions);
    const newConditions = {
        aggregator: '',
        attributes: [],
    };
    for (const condition_index in parsedConditions) {
        const condition_item = parsedConditions[condition_index];

        if (condition_index.split('--').length === 1 && condition_item.aggregator && condition_item.aggregator === 'all') {
            newConditions.aggregator = 'all';
        }

        if (condition_index.split('--').length === 2 && condition_item.attribute) {
            newConditions.attributes.push(condition_item);
        }
    }

    return newConditions;
};

const generateQueries = (variables) => {
    const queryVariables = {
        filter: {},
    };
    variables.attributes.forEach((variable) => {
        const { attribute, operator, value } = variable;
        let newValue;

        // prettier-ignore
        switch (operator) {
        case '<':
            newValue = Number(value - 1).toString();
            break;
        case '>':
            newValue = Number(value + 1).toString();
            break;

        default:
            newValue = value;
        }

        if (attribute === 'price') {
            if (operator === '>' || operator === '>=') {
                queryVariables.filter.price = { ...queryVariables.filter.price, from: operator === '>' ? newValue : value };
            }
            if (operator === '<' || operator === '<=') {
                queryVariables.filter.price = { ...queryVariables.filter.price, to: operator === '<' ? newValue : value };
            }
            if (operator === '==') {
                queryVariables.filter.price = { ...queryVariables.filter.price, from: newValue, to: newValue };
            }
        }

        if (attribute === 'category_ids') {
            if (operator === '==') {
                queryVariables.filter.category_id = { ...queryVariables.filter.category_id, in: [value] };
            }
        }
    });
    return queryVariables;
};

export { getProductListConditions, generateQueries };
