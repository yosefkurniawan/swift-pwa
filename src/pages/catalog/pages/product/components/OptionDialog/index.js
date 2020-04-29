/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Toast from '@components/Toast';
import { Dialog, Fade } from '@material-ui/core';
// import Router from 'next/router';
import React from 'react';
import ConfigurableOption from './ConfigurableOption';
import SimpleOption from './SimpleOption';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => (
    <Fade ref={ref} {...props} />
));

const OptionDialog = (props) => {
    const {
        open,
        setOpen,
        t,
        data: { __typename },
    } = props;
    const styles = useStyles();
    const [message, setMessage] = React.useState({
        variant: 'success',
        open: false,
        text: t('product:successAddCart'),
    });


    return (
        <>
            <Toast
                open={message.open}
                setOpen={() => setMessage({ ...message, open: false })}
                message={message.text}
                variant={message.variant}
            />
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
                onClose={setOpen}
                PaperProps={{
                    className: styles.dialog,
                }}
            >
                <div className={styles.root}>
                    <div
                        className={styles.bannerContainer}
                        onClick={() => setOpen()}
                    />
                    <div className={styles.optionContainer}>
                        {__typename === 'ConfigurableProduct' && (
                            <ConfigurableOption
                                setMessage={setMessage}
                                {...props}
                            />
                        )}

                        {__typename === 'SimpleProduct' && (
                            <SimpleOption setMessage={setMessage} {...props} />
                        )}
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default OptionDialog;
