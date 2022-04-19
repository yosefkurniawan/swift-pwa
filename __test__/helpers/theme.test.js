/* eslint-disable consistent-return */
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

jest.mock('@material-ui/core/styles', () => ({
    __esModule: true,
    default: jest.fn(() => 42),
    useTheme: jest.fn(() => ({
        breakpoints: {
            up: jest.fn((val) => {
                if (val === 'xs') return '@media (min-width: 0px)';
                if (val === 'sm') return '@media (min-width: 768px)';
                if (val === 'md') return '@media (min-width: 1024px)';
                if (val === 'lg') return '@media (min-width: 1200px)';
                if (val === 'xl') return '@media (min-width: 1920px)';
            }),
        },
    })),
}));

jest.mock('@material-ui/core/useMediaQuery', () => ({
    __esModule: true,
    default: jest.fn((val) => val),
}));

/**
 * check breakpoints up
 * @param string breakpoinst xs, sm, md , lg, xl  */
const breakPointsUp = (value) => {
    const theme = useTheme();
    const result = useMediaQuery(theme.breakpoints.up(value));

    return result;
};

describe('Theme Helper', () => {
    it('Generate breakpoints', () => {
        expect(breakPointsUp('sm')).toBe('@media (min-width: 768px)');
    });
});
