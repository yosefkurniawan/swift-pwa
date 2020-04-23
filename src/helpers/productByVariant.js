
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
