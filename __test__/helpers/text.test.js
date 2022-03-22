import { render, screen } from '@testing-library/react';
import { capitalizeEachWord } from '@helpers/text';

describe('Text Helpers', () => {
    it('Prints out capitalize each word', () => {
        render(
            <p>
                {capitalizeEachWord('hello world')}
            </p>,
        );

        const capitalizedText = screen.getByText('Hello World');

        expect(capitalizedText).toBeInTheDocument();
    });
});
