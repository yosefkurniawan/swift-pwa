import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IcubeMaps from '@common_googlemaps';
import Header from '@common_headermobile';
import Button from '@common_button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTextField from '@common_textfield';
import Typography from '@common_typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './style';

const AddressView = (props) => {
    const {
        t, open, setOpen, pageTitle, formik, addressState, setFromUseEffect, getCities, setAddressState,
        mapPosition, handleDragPosition, disableDefaultAddress, loading, success, gmapKey, enableSplitCity,
    } = props;
    const styles = useStyles();
    const headerConfig = {
        headerTitle: pageTitle || t('customer:address:addTitle'),
        header: 'relative',
        headerBackIcon: 'close',
    };
    const addBtn = success ? styles.addBtnSuccess : styles.addBtn;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const getRegionRender = () => {
        if (addressState.dropdown.region && addressState.dropdown.region.length && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.country}
                    options={addressState.dropdown.region}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-region"
                    value={!formik.values.region ? null : formik.values.region}
                    onClose={() => {
                        formik.setFieldValue('city', null);
                    }}
                    onChange={async (event, newValue) => {
                        formik.setFieldValue('region', newValue);
                        if (newValue) {
                            setFromUseEffect(false);
                            getCities({ variables: { regionId: newValue.id } });
                        }
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                                name="state"
                                label={t('common:form:state')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onKeyDown={(event) => {
                                    if (event.key !== 'Enter' && event.key !== 'Tab') {
                                        const state = {
                                            ...addressState,
                                        };
                                        state.dropdown.city = null;
                                        setAddressState(state);
                                        formik.setFieldValue('city', null);
                                    }
                                }}
                                error={!!(formik.touched.region && formik.errors.region)}
                            />
                            <Typography variant="p" color={formik.touched.region && formik.errors.region ? 'red' : 'default'}>
                                {formik.touched.region && formik.errors.region}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.country}
                autoComplete="new-password"
                label="State/Province"
                name="region"
                value={(formik.values.region && formik.values.region.label) || formik.values.region || ''}
                onChange={(e) => formik.setFieldValue('region', { code: e.target.value, label: e.target.value })}
                error={!!(formik.touched.region && formik.errors.region)}
                errorMessage={(formik.touched.region && formik.errors.region) || null}
            />
        );
    };

    const getCityRender = () => {
        if (addressState.dropdown.city && addressState.dropdown.city.length && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.region}
                    options={addressState.dropdown.city}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-city"
                    value={!formik.values.city ? null : formik.values.city}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('city', newValue);
                        formik.setFieldValue('postcode', newValue ? newValue.postcode : '');
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                                name="city"
                                label={t('common:form:city')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.city && formik.errors.city)}
                            />
                            <Typography variant="p" color={formik.touched.city && formik.errors.city ? 'red' : 'default'}>
                                {formik.touched.city && formik.errors.city}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.region}
                autoComplete="new-password"
                label="City"
                name="city"
                value={(formik.values.city && formik.values.city.label) || formik.values.city || ''}
                onChange={(e) => formik.setFieldValue('city', { code: e.target.value, label: e.target.value })}
                error={!!(formik.touched.city && formik.errors.city)}
                errorMessage={(formik.touched.city && formik.errors.city) || null}
            />
        );
    };

    const getDistrictRender = () => {
        if (addressState.dropdown.district && addressState.dropdown.district.length && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.city}
                    options={addressState.dropdown.district}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-district"
                    value={!formik.values.district ? null : formik.values.district}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('district', newValue);
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                                name="district"
                                label="Kecamatan"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.district && formik.errors.district)}
                            />
                            <Typography variant="p" color={formik.touched.district && formik.errors.district ? 'red' : 'default'}>
                                {formik.touched.district && formik.errors.district}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.city}
                autoComplete="new-password"
                label="Kecamatan"
                name="district"
                value={formik.values.district ? formik.values.district.label : ''}
                onChange={formik.handleChange}
                error={!!(formik.touched.district && formik.errors.district)}
                errorMessage={(formik.touched.district && formik.errors.district) || null}
            />
        );
    };

    const getVillageRender = () => {
        if (addressState.dropdown.village && addressState.dropdown.village.length && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.district}
                    options={addressState.dropdown.village}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-village"
                    value={!formik.values.village ? null : formik.values.village}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('village', newValue);
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                                name="village"
                                label="Kelurahan"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.village && formik.errors.village)}
                            />
                            <Typography variant="p" color={formik.touched.village && formik.errors.village ? 'red' : 'default'}>
                                {formik.touched.village && formik.errors.village}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.district}
                autoComplete="new-password"
                label="Kelurahan"
                name="village"
                value={formik.values.village ? formik.values.village.label : ''}
                onChange={formik.handleChange}
                error={!!(formik.touched.village && formik.errors.village)}
                errorMessage={(formik.touched.village && formik.errors.village) || null}
            />
        );
    };

    return (
        <Dialog open={open} className={[styles.address_drawer].join(' ')} maxWidth="sm" fullWidth={!!isDesktop} fullScreen={!isDesktop}>
            <div className={styles.container}>
                <Header
                    pageConfig={headerConfig}
                    LeftComponent={{
                        onClick: () => {
                            formik.resetForm();
                            setOpen();
                        },
                    }}
                    className={styles.pageTitle}
                />
                <div className={[styles.address_form].join(' ')}>
                    <form onSubmit={formik.handleSubmit} autoComplete="new-password">
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:firstName')}
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.firstname && formik.errors.firstname)}
                            errorMessage={(formik.touched.firstname && formik.errors.firstname) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:lastName')}
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.lastname && formik.errors.lastname)}
                            errorMessage={(formik.touched.lastname && formik.errors.lastname) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:street')}
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            errorMessage={(formik.touched.street && formik.errors.street) || null}
                        />
                        {addressState.dropdown.countries && addressState.dropdown.countries.length && open ? (
                            <Autocomplete
                                options={addressState.dropdown.countries}
                                getOptionLabel={(option) => (option.label ? option.label : '')}
                                id="controlled-demo"
                                value={formik.values.country}
                                onClose={() => {
                                    formik.setFieldValue('region', null);
                                    formik.setFieldValue('city', null);
                                }}
                                onChange={(event, newValue) => {
                                    const state = { ...addressState };
                                    state.dropdown.region = newValue ? newValue.available_regions : null;
                                    state.dropdown.region = !state.dropdown.region || state.dropdown.region.map((item) => (
                                        { ...item, label: item.name }));
                                    state.dropdown.city = null;

                                    setAddressState(state);
                                    formik.setFieldValue('country', newValue);
                                }}
                                renderInput={(params) => (
                                    <div
                                        style={{
                                            marginTop: '10px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <TextField
                                            {...params}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                            name="country"
                                            label={t('common:form:country')}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onKeyDown={(event) => {
                                                if (event.key !== 'Enter' && event.key !== 'Tab') {
                                                    const state = {
                                                        ...addressState,
                                                    };
                                                    state.dropdown.region = null;
                                                    state.dropdown.city = null;
                                                    state.value.region = {
                                                        id: '',
                                                        label: '',
                                                    };
                                                    setAddressState(state);

                                                    formik.setFieldValue('region', null);
                                                    formik.setFieldValue('city', null);
                                                }
                                            }}
                                            error={!!(formik.touched.country && formik.errors.country)}
                                        />
                                        <Typography variant="p" color={formik.touched.country && formik.errors.country ? 'red' : 'default'}>
                                            {formik.touched.country && formik.errors.country}
                                        </Typography>
                                    </div>
                                )}
                            />
                        ) : null}
                        {getRegionRender()}
                        {getCityRender()}
                        {enableSplitCity ? getDistrictRender() : null}
                        {enableSplitCity ? getVillageRender() : null}
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:postal')}
                            name="postcode"
                            value={formik.values.postcode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.postcode && formik.errors.postcode)}
                            errorMessage={(formik.touched.postcode && formik.errors.postcode) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:phoneNumber')}
                            name="telephone"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.telephone && formik.errors.telephone)}
                            errorMessage={(formik.touched.telephone && formik.errors.telephone) || null}
                        />
                        {gmapKey && (
                            <div className={styles.boxMap}>
                                <IcubeMaps height="230px" mapPosition={mapPosition} dragMarkerDone={handleDragPosition} gmapKey={gmapKey} />
                            </div>
                        )}

                        {disableDefaultAddress ? null : (
                            <div>
                                <FormControlLabel
                                    value={formik.values.defaultBilling}
                                    checked={formik.values.defaultBilling}
                                    onChange={() => formik.setFieldValue('defaultBilling', !formik.values.defaultBilling)}
                                    name="defaultBilling"
                                    control={<Checkbox name="newsletter" color="primary" size="small" />}
                                    label={(
                                        <Typography variant="p" letter="capitalize" className="row center">
                                            {t('customer:address:useBilling')}
                                        </Typography>
                                    )}
                                />

                                <FormControlLabel
                                    value={formik.values.defaultShipping}
                                    checked={formik.values.defaultShipping}
                                    onChange={() => formik.setFieldValue('defaultShipping', !formik.values.defaultShipping)}
                                    name="defaultShipping"
                                    control={<Checkbox name="newsletter" color="primary" size="small" />}
                                    label={(
                                        <Typography variant="p" letter="capitalize" className="row center">
                                            {t('customer:address:useShipping')}
                                        </Typography>
                                    )}
                                />
                            </div>
                        )}

                        <div className={styles.wrapper}>
                            <Button className={addBtn} fullWidth type="submit" disabled={loading} loading={loading}>
                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                    {t(success ? 'common:button:saved' : 'common:button:save')}
                                </Typography>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default AddressView;
