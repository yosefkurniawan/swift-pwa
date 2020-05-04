/**
 * function to get combination available
 * @param selected object example {code: "color", value: "Black"}
 * @param array varians product
 * @returns object product
 */

export const getCombinationVariants = (selected = {}, variants = []) => {
    const combination = {
        code: selected.code,
        value: selected.value,
        available_combination: [],
    };
    if (selected.code) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < variants.length; index++) {
            if (variants[index].product.stock_status === 'IN_STOCK') {
                const { attributes } = variants[index];
                let isSameFirstCode = false;
                // eslint-disable-next-line no-plusplus
                for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
                    if (selected.code === attributes[idxAtt].code) {
                        isSameFirstCode = attributes[idxAtt].label === selected.value || attributes[idxAtt].value_index === selected.value;
                    }
                }
                // eslint-disable-next-line no-plusplus
                for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
                    if (selected.code !== attributes[idxAtt].code && isSameFirstCode) {
                        combination.available_combination.push(attributes[idxAtt]);
                    }
                }
            }
        }
    }
    return combination;
};

export const CheckAvailableOptions = (availableCombination = [], value) => {
    let available = false;
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < availableCombination.length; index++) {
        if (availableCombination[index].label === value || availableCombination[index].value_index === value) {
            available = true;
            break;
        }
    }
    return available;
};

/**
 * function to get product by spesific variant
 * @param options object
 * @param array varians product
 * @returns object product
 *  */
export default function productByVariant(options = {}, variants = []) {
    let product = {};
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < variants.length; index++) {
        const { attributes } = variants[index];
        let isSpesific = false;
        // eslint-disable-next-line no-plusplus
        for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
            if (typeof options[attributes[idxAtt].code] !== 'undefined') {
                if (options[attributes[idxAtt].code] === attributes[idxAtt].label) {
                    isSpesific = true;
                } else {
                    isSpesific = false;
                    break;
                }
            }
        }
        if (isSpesific) {
            product = variants[index].product;
            break;
        }
    }
    return product;
}
