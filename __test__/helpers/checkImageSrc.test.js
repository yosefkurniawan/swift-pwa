import { render, screen } from '@testing-library/react';
import setDefaultWhenEmpty from '@helpers/checkImageSrc';

describe('Check Image Source', () => {
    it('Should return default image source, if empty parameter provided', () => {
        render(
            <>
                <div>{setDefaultWhenEmpty('')}</div>
            </>,
        );

        const imageSource = screen.getByText('/assets/img/sample/product.png');
        expect(imageSource).toBeInTheDocument();
    });

    it('Should return default image source, if empty parameter provided', () => {
        render(
            <>
                <div>{setDefaultWhenEmpty('/assets/image.jpg')}</div>
            </>,
        );

        const imageSource = screen.getByText('/assets/image.jpg');
        expect(imageSource).toBeInTheDocument();
    });
});
