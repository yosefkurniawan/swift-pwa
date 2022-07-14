import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

/**
 * check breakpoints up
 * @param string breakpoinst xs, sm, md , lg, xl  */
export const breakPointsUp = (value) => {
    const theme = useTheme();
    const result = useMediaQuery(theme.breakpoints.up(value));

    return result;
};

export const breakPointsBetween = (valueMin, valueMax) => {
    const theme = useTheme();
    const result = useMediaQuery(theme.breakpoints.between(valueMin, valueMax));

    return result;
};

export const breakPointsDown = (value) => {
    const theme = useTheme();
    const result = useMediaQuery(theme.breakpoints.down(value));

    return result;
};

export default {
    breakPointsUp,
    breakPointsBetween,
    breakPointsDown,
};
