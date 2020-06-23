/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

let WebFont = '';

if (typeof window !== 'undefined') {
    WebFont = require('webfontloader');
}

const Fonts = () => {
    if (typeof window !== 'undefined') {
        WebFont.load({
            google: {
                families: ['Montserrat:400,500,600,800'],
            },
        });
    }
};

export default Fonts;
