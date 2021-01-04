import Modal from '@material-ui/core/Modal';
import { useTranslation } from '@i18n';

const ModalCookies = () => {
    const { t } = useTranslation();
    return (
        <>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className="modal-cookies"
            >
                <div className="modal-paper">
                    <h2 id="server-modal-title">{t('common:error:browser')}</h2>
                    <p id="server-modal-description">{t('common:message:browserError')}</p>
                </div>
            </Modal>
            <style jsx global>
                {`
                .modal-cookies {
                    display: flex;
                    padding: 20px;
                    align-items: center;
                    justify-content: center;
                }
    
                .modal-paper {
                    width: 400px;
                    background-color: #fff;
                    box-shadow: 5px 10px 10px rgba(0,0,0, 0.3);
                    padding: 20px;
                    border-radius: 5px;
                }
            
            `}
            </style>
        </>
    );
};

export default ModalCookies;
