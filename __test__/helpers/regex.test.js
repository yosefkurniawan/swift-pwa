import { render, screen } from '@testing-library/react';
import { regexPhone, regexEmail } from '@helpers/regex';

describe('Regex Helpers', () => {
    it('Prints out capitalize each word', () => {
        render(
            <>
                <div>{regexPhone.test('085398652346')}</div>
                <div>{regexEmail.test('fakhri.rizha@sirclo.com')}</div>
            </>,
        );

        const capitalizedText = screen.getByText('Hello World');

        expect(capitalizedText).toBeInTheDocument();
    });
});
