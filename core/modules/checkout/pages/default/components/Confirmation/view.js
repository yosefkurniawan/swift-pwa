/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import Typography from '@common_typography';
import Checkbox from '@common_checkbox';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
import useStyles from '@core_modules/checkout/pages/default/components/Confirmation/style';

const ConfirmationView = ({
    t, state, handleChange, loading, agreements
}) => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);

    const styles = useStyles();
    const Loader = () => (
        <div className={styles.container}>
            <Skeleton variant="text" width="40%" height={35} />
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="80%" height={30} />
        </div>
    );
    if (loading.all || loading.confirmation) {
        return <Loader />;
    }
    
    const data = agreements && agreements.checkoutAgreements.map((option) => ({
        ...option,
        originalLabel: option.checkbox_text,
        label: `${option.checkbox_text}`,
        value: JSON.stringify(option),
    }));
    return (
        <>
            <div className={styles.container} id="checkoutAgreements">
                {
                    agreements && agreements.checkoutAgreements.map((item, key) => {
                        return (
                            <div className={styles.boxItem} key={key}>
                                <Typography variant="span" type="bold" className="clear-margin-padding">
                                    Confirmation
                                </Typography>
                                <Grid item md={6} xs={6}>
                                    <Checkbox
                                        label=""
                                        key={key}
                                        flex="column"
                                        data={data}
                                        value={state[item.agreement_id] ? state[item.agreement_id] : []}
                                        classCheckbox={styles.checkbox}
                                        classContainer={styles.checkboxContainer}
                                        onChange={(val) => handleChange(item.agreement_id, val)}
                                    />
                                </Grid>
                                <Grid item md={6} xs={6}>
                                    <Button onClick={handleClickOpen('paper')}>Open {item.name}</Button>
                                </Grid>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    scroll={scroll}
                                    aria-labelledby="scroll-dialog-title"
                                    aria-describedby="scroll-dialog-description"
                                >
                                    <DialogTitle id="scroll-dialog-title">{item.name}</DialogTitle>
                                    <DialogContent dividers={scroll === 'paper'}>
                                    <DialogContentText
                                        id="scroll-dialog-description"
                                        tabIndex={-1}
                                    >
                                        <div className="contentAgreement" dangerouslySetInnerHTML={{__html: item.content}}/>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

export default ConfirmationView;
