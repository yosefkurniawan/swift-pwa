import { render, screen } from '@testing-library/react';
import { regexPhone, regexEmail } from '@helpers/regex';

const phoneTestCase = [
    {
        name: 'valid phone number indonesia 12 digits',
        value: '081212345678',
    },
    {
        name: 'valid phone number indonesia 11 digits',
        value: '08121234567',
    },
    {
        name: 'valid phone number indonesia 10 digits',
        value: '0812123456',
    },
    {
        name: 'valid phone number indonesia 12 digits with cc code',
        value: '+6285398652346',
    },
    {
        name: 'valid phone number indonesia 11 digits with cc code',
        value: '+628539865234',
    },
    {
        name: 'valid phone number indonesia 10 digits with cc code',
        value: '+62853986523',
    },

];

const emailTestCase = [
    {
        name: 'valid email',
        value: 'fakhri.rizha@sirclo.com',
    },
];

describe('Regex Phone', () => {
    it('Check match RegExp for phone format', () => {
        render(
            <>
                {phoneTestCase.map((testCase, index) => (
                    <div key={index}>{regexPhone.test(testCase.value) ? 'True Phone' : 'False Phone'}</div>
                ))}
            </>,
        );

        const falsePhone = screen.queryByText('False Phone');
        expect(falsePhone).toBeNull();
    });
});

describe('Regex Email', () => {
    it('Check match RegExp for email format', () => {
        render(
            <>
                {emailTestCase.map((testCase, index) => (
                    <div key={index}>{regexEmail.test(testCase.value) ? 'True Email' : 'False Email'}</div>
                ))}
            </>,
        );

        const falseEmail = screen.queryByText('False Email');
        expect(falseEmail).toBeNull();
    });
});
