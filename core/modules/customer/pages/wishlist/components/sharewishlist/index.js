/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import IconButton from '@material-ui/core/IconButton';
import Typography from '@common_typography';
import Button from '@common_button';
import classNames from 'classnames';
import TextField from '@common_textfield';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import useStyles from '@core_modules/customer/pages/wishlist/components/sharewishlist/style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));
const ShareWishlistView = (props) => {
    const styles = useStyles();
    const {
        open, setOpen, handleShareWishlist,
    } = props;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const [emailCollection, setEmailCollection] = React.useState('');
    const [message, setMessage] = React.useState('');
    const handleSetEmail = (event) => {
        setEmailCollection(event.target.value);
    };
    const handleSetMessage = (event) => {
        setMessage(event.target.value);
    };
    const setShareWishlist = async () => {
        const response = await handleShareWishlist(emailCollection, message);
        if (response === 1) {
            setOpen();
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
            maxWidth="sm"
            fullWidth={!!isDesktop}
            fullScreen={!isDesktop}
        >
            <div>
                <DialogContent dividers>
                    <div className={classNames('col-md-12', styles.container)}>
                        <IconButton
                            style={{
                                position: 'absolute',
                                right: 5,
                                top: 0,
                            }}
                            edge="start"
                            onClick={setOpen}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h5" type="bold" letter="uppercase" style={{ marginLeft: 0, marginBottom: 35 }}>
                            WISH LIST SHARING
                        </Typography>
                        <Typography variant="h7" type="bold" letter="uppercase" style={{ margin: 0 }}>
                            Sharing Information
                        </Typography>
                        <Divider style={{ marginBottom: 20 }} />
                        <div className={styles.wrapperText}>
                            <TextField
                                label="Email addresses, separated by commas"
                                value={emailCollection}
                                onChange={handleSetEmail}
                                multiline
                                rows={5}
                                error={false}
                            />
                        </div>
                        <div className={styles.wrapperText}>
                            <TextField
                                label="Message"
                                value={message}
                                onChange={handleSetMessage}
                                multiline
                                rows={5}
                                error={false}
                            />
                        </div>
                        <div>
                            <Button
                                onClick={() => setShareWishlist()}
                                className={styles.btnWishlist}
                                align="left"
                            >
                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                    Share Wish List
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
};

const ShareWishlistComponent = (props) => (
    <ShareWishlistView
        {...props}
    />
);

export default ShareWishlistComponent;
