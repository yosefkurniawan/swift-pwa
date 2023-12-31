import React from 'react';
import dynamic from 'next/dynamic';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@common_typography';

import useStyles from '@plugin_optionitem/BundleOption/style';

const Button = dynamic(() => import('@common_button'), { ssr: false });
const Customize = dynamic(() => import('@plugin_optionitem/BundleOption/components/customize'), { ssr: true });

const Accordion = withStyles(
    {
        root: {
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
        disabled: {
            background: '#fff !important',
        },
        expanded: {},
    },
    { name: 'MuiBundleViewAccordion' },
)(MuiAccordion);

const AccordionSummary = withStyles(
    {
        root: {
            marginBottom: -1,
            padding: 0,
            minHeight: 56,
            '&$expanded': {
                minHeight: 56,
            },
        },
        content: {
            '&$expanded': {
                margin: '12px 0',
            },
        },
        expanded: {},
    },
    { name: 'MuiBundleViewAccordionSummary' },
)(MuiAccordionSummary);

const AccordionDetails = withStyles(
    {
        root: {
            padding: 0,
            display: 'block',
        },
    },
    { name: 'MuiBundleViewAccordionDetails' },
)(MuiAccordionDetails);

const BundleView = (props) => {
    const {
        t, data, items, changeQty, generateBundlePrice, selectOptions,
        handleAddToCart, loading, disabled, customButton, currencyCache,
    } = props;
    const [open, setOpen] = React.useState(false || (typeof window !== 'undefined' && window.innerWidth <= 768));
    const styles = useStyles();

    if (customButton) {
        return customButton;
    }

    return (
        <div>
            <Accordion disabled={disabled} square expanded={open} onChange={() => setOpen(!open)}>
                <AccordionSummary className="hidden-mobile" aria-controls="panel1d-content" id="panel1d-header">
                    <Button
                        id="plugin-customizeAdd-btn"
                        className={styles.btnOpenSimple}
                        color="primary"
                        onClick={() => {}}
                        loading={(loading && !data) || !data}
                        disabled={disabled}
                    >
                        <Typography
                            align="center"
                            type="bold"
                            letter="uppercase"
                            color="white"
                            variant="span"
                        >
                            {t('product:customizeAdd')}
                        </Typography>
                    </Button>
                </AccordionSummary>
                <AccordionDetails>
                    {data ? (
                        <Customize
                            data={data}
                            items={items}
                            t={t}
                            changeQty={changeQty}
                            generateBundlePrice={generateBundlePrice}
                            selectOptions={selectOptions}
                            handleAddToCart={handleAddToCart}
                            loading={loading}
                            currencyCache={currencyCache}
                        />
                    ) : null}

                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default BundleView;
