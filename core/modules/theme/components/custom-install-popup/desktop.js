import Button from '@material-ui/core/Button';
import useStyles from '@core_modules/theme/components/custom-install-popup/style';

const DesktopInstall = ({ installMessage = 'Install' }) => {
    const styles = useStyles();
    return (
        <div id="popup-desktop__install" className={styles.popupInstallDesktop}>
            <Button
                id="btn-install"
                variant="contained"
                color="primary"
                className={styles.btnInstallDesktop}
            >
                Install
            </Button>
            {' '}
            {installMessage}
        </div>
    );
};

export default DesktopInstall;
