import { breakPointsUp } from '@helpers/theme';

describe('Encryption Helper', () => {
    it('Encrypt a string/text', () => {
        expect(breakPointsUp('sm')).toBe(24);
    });
});
