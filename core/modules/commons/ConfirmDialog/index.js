/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@common_button';
import propTypes from 'prop-types';
import { useTranslation } from '@i18n';

const ConfirmationDialog = ({
    open = false, handleYes, handleCancel, message, confirmationMessage, confirmOnly = false, yesNo = false,
}) => {
    const { t } = useTranslation(['common']);
    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            maxWidth="xs"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{ color: 'rgba(0, 0, 0, 0.75' }}>
                    {message}
                    {confirmationMessage !== '' ? (
                        <>
                            <br />
                            {confirmationMessage}
                        </>
                    ) : ''}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: '0rem 0rem 1rem' }}>
                {confirmOnly ? (
                    <Button onClick={handleYes} color="primary" autoFocus>
                        {t('common:button:confirm')}
                    </Button>
                ) : (
                        <>
                            <Button onClick={handleYes} color="primary" autoFocus align="right">
                                {t('common:button:yes')}
                            </Button>
                            <Button onClick={handleCancel} color="primary" align="left">
                                {!yesNo ? t('common:button:cancel') : t('common:button:no')}
                            </Button>
                        </>
                )}
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialog.propTypes = {
    open: propTypes.bool.isRequired,
    handleYes: propTypes.func.isRequired,
    handleCancel: propTypes.func.isRequired,
    message: propTypes.string,
};

ConfirmationDialog.defaultProps = {
    message: 'Are you Sure ?',
};

export default ConfirmationDialog;
