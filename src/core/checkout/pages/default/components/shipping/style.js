import { CreatePadding } from '@theme/mixins';

export const ExpanPanelStyle = {
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
};

export const ExpanSummaryStyle = {
    root: {
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        height: 40,
        '&$expanded': {
            height: 40,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
};

export const ExpanDetailStyle = {
    root: {
        ...CreatePadding(15, 15, 15, 15),
    },
};
