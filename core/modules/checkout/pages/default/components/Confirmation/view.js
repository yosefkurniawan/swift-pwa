/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Typography from '@common_typography';
import Checkbox from '@common_checkbox';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Spiner from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import useStyles from '@core_modules/checkout/pages/default/components/Confirmation/style';

const ConfirmationView = ({
    t, state, handleChange, agreements, loading
}) => {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

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
    
    const data = agreements && agreements.checkoutAgreements.map((option) => ({
        ...option,
        originalLabel: option.checkbox_text,
        label: `${option.checkbox_text}`,
        value: JSON.stringify(option),
    }));

    return (
        <>
            <div className={styles.container} id="checkoutAgreements">
                <FormControl
                    fullWidth
                    className={styles.customFormControl}
                >
                {
                    agreements && agreements.checkoutAgreements.map((item, key) => {
                        if(item.mode === "MANUAL"){
                            return (
                                <div className={styles.boxItem} key={key}>
                                    <Grid id="agreement-row" container spacing={0}>
                                        <Grid item md={12} xs={12}>
                                            {
                                                loading.all ? (
                                                    <Spiner size="1rem" />
                                                ) : null
                                            }
                                            <Checkbox
                                                name="confirmation"
                                                label={t('checkout:confirmation')}
                                                key={item.agreement_id}
                                                data={data}
                                                value={state[item.agreement_id] ? state[item.agreement_id] : []}
                                                classCheckbox={styles.checkbox}
                                                classContainer={styles.checkboxContainer}
                                                onChange={handleChange}
                                            />
                                            <Button className={styles.linkModal} align="left" variant="text" onClick={handleClickOpen('paper')}>
                                                <Typography variant="span" type="regular" decoration="underline" size="12">
                                                {t('checkout:open')} {item.name}
                                                </Typography>
                                            </Button>
                                        </Grid>
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
                                            <Button onClick={handleClose}>{t('checkout:close')}</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            );
                        } else {
                            const autoAgreement = "automatically";
                            handleChange(autoAgreement);
                            return (
                                <div className={styles.boxItem} key={key}>
                                    <Grid id="agreement-row" container spacing={0}>
                                        <Grid item md={12} xs={12}>
                                            <Button className={styles.linkModal} align="left" variant="text" onClick={handleClickOpen('paper')}>
                                                <Typography variant="span" type="regular" decoration="underline" size="12">
                                                {t('checkout:open')} {item.name}
                                                </Typography>
                                            </Button>
                                        </Grid>
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
                                            <Button onClick={handleClose}>{t('checkout:close')}</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            );
                        }
                    })
                }
                </FormControl>
            </div>
        </>
    );
};

export default ConfirmationView;
