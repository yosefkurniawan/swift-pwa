/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@components/Button';
import Typography from '@components/Typography';
import classNames from 'classnames';
import useStyles from './style';
import ModalPickupInformation from '../ModalPickupInformation';
import ModalSelectStore from '../ModalSelectStore';

export default (props) => {
    const {
        t, styles, checkout, setCheckout,
    } = props;
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState({
        openModalInfo: false,
        openModalSelectStore: false,
    });
    const handleOpen = (state) => {
        setOpenModal({
            ...openModal,
            [state]: !openModal[state],
        });
    };
    return (
        <div className={styles.block}>
            <ModalPickupInformation
                open={openModal.openModalInfo}
                setOpen={() => handleOpen('openModalInfo')}
                setCheckout={setCheckout}
                checkout={checkout}
            />
            <ModalSelectStore
                open={openModal.openModalSelectStore}
                setOpen={() => handleOpen('openModalSelectStore')}
                setCheckout={setCheckout}
                checkout={checkout}
            />
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:pickupInformation:label')}
            </Typography>
            <div className={classNames(styles.cardPoint, classes.card)}>
                <div className="column">
                    {
                        (checkout.pickupInformation.person && checkout.pickupInformation.person !== ''
                         && checkout.pickupInformation.email && checkout.pickupInformation.email !== ''
                         && checkout.pickupInformation.phoneNumber && checkout.pickupInformation.phoneNumber !== ''
                        ) && (
                            <div className="column">
                                <div className="row">
                                    <Typography>
                                        {`${t('checkout:pickupInformation:pickupPerson')} : `}
                                    </Typography>
                                    <Typography type="semiBold">
                                        {checkout.pickupInformation.person}
                                    </Typography>
                                </div>
                                <div className="row">
                                    <Typography>
                                        {`${t('common:form:phoneNumber')} : `}
                                    </Typography>
                                    <Typography type="semiBold">
                                        {checkout.pickupInformation.phoneNumber}
                                    </Typography>
                                </div>
                                <div className="row">
                                    <Typography>
                                        Email :
                                    </Typography>
                                    <Typography type="semiBold">
                                        {checkout.pickupInformation.email}
                                    </Typography>
                                </div>
                            </div>
                        )
                    }
                    <Button variant="text" className="clear-margin-padding" onClick={() => handleOpen('openModalInfo')}>
                        <Typography variant="span" letter="uppercase" type="bold">
                            {t('checkout:pickupInformation:changePickupInformation')}
                        </Typography>
                    </Button>
                </div>
            </div>
            <Typography>
                {t('checkout:pickupInformation:pickupAtLabel')}
            </Typography>
            <div className={classNames(styles.cardPoint, classes.card)}>
                <div className="column">
                    {
                        (checkout.selectStore.name && checkout.selectStore.name !== ''
                         && checkout.selectStore.address && checkout.selectStore.address !== ''
                         && checkout.selectStore.phoneNumber && checkout.selectStore.phoneNumber !== ''
                        ) && (
                            <>
                                <Typography variant="span" type="bold">
                                    {checkout.selectStore.name}
                                </Typography>
                                <Typography>
                                    {`${checkout.selectStore.address} ${checkout.selectStore.phoneNumber}`}
                                </Typography>
                            </>
                        )
                    }
                    <Button variant="text" className="clear-margin-padding" onClick={() => handleOpen('openModalSelectStore')}>
                        <Typography variant="span" letter="uppercase" type="bold">
                            {t('checkout:pickupInformation:changePickupLocation')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};
