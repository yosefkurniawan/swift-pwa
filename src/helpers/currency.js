const IDR = (value) => {
    let number = 0;
    if(Number.isInteger(value)){
        number = parseInt(value)
    }
    number = number.toLocaleString(undefined, {minimumFractionDigits : 0})
    return `IDR ${number}`
}

const currency = ({currency = 'IDR', value = 0}) => {
    switch (currency.toUpperCase()) {
        case 'IDR':
            return IDR(value)
            break;
    
        default:
            break;
    }
}

export default currency