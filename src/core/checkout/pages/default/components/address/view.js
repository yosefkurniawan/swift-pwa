import AddressFormDialog from '@components/AddressFormDialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import _ from 'lodash';
import useStyles from '../style';

const CLOSE_ADDRESS_DIALOG = 750;

const AddressView = (props) => {
    const styles = useStyles();
    const {
        data, checkout, setAddress, setCheckout, t, dialogProps, loading, address, content,
    } = props;
    return (
        <div className={styles.block}>
            <div className={styles.addressContainer}>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:shippingAddress')}
                    </Typography>
                    <Typography variant="p">{content}</Typography>
                </div>
                <div>
                    <AddressFormDialog
                        {...dialogProps}
                        t={t}
                        onSubmitAddress={async (dataAddress) => {
                            const { cart } = checkout.data;
                            let state = { ...checkout };

                            await setAddress(dataAddress, cart);
                            state.status.addresses = true;
                            setCheckout(state);

                            _.delay(() => {
                                state = { ...checkout };
                                state.status.openAddressDialog = false;
                                setCheckout(state);
                                state.status.addresses = false;
                                setCheckout(state);
                            }, CLOSE_ADDRESS_DIALOG);
                        }}
                        loading={checkout.loading.addresses}
                        success={checkout.status.addresses}
                        open={checkout.status.openAddressDialog}
                        disableDefaultAddress
                        setOpen={() => setCheckout({
                            ...checkout,
                            status: {
                                ...checkout.status,
                                openAddressDialog: false,
                            },
                        })}
                        pageTitle={t('checkout:address:addTitle')}
                    />
                    {loading.addresses || loading.all ? null : (
                        <Button
                            variant="outlined"
                            href={data.isGuest ? null : '/customer/account/address'}
                            onClick={
                                data.isGuest
                                    ? () => {
                                        setCheckout({
                                            ...checkout,
                                            status: {
                                                ...checkout.status,
                                                openAddressDialog: true,
                                            },
                                        });
                                    }
                                    : null
                            }
                        >
                            <Typography variant="p" type="bold" letter="uppercase">
                                {data.isGuest && !address
                                    ? t('common:button:addAddress')
                                    : t(_.isNull(address) ? 'common:button:manage' : 'common:button:change')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressView;
