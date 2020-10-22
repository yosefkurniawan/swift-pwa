import Radio from '@common_radio';
import Button from '@common_button';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import Typography from '@common_typography';
import useStyles from './style';
import CheckboxSettings from './checkbox';
import CheckboxView from './checkbox/view';
import Layout from '../../../components/layout';

const subData = [{ value: 'subscribed', label: 'Subscribtion' }];

const SettingPage = (props) => {
    const styles = useStyles();
    const {
        t, customer, setSettings, dataLang, lang, setLang, handleSave,
    } = props;
    const desktop = breakPointsUp('sm');
    return (
        <Layout {...props}>
            <div className={classNames('col-md-12', styles.container)}>
                <div className={styles.block}>
                    {typeof customer.is_subscribed !== 'undefined' ? (
                        <CheckboxSettings
                            name="is_subscribed"
                            t={t}
                            value={customer.is_subscribed ? ['subscribed'] : []}
                            setSettings={setSettings}
                            data={subData}
                            CheckboxView={CheckboxView}
                        />
                    ) : <Skeleton variant="rect" height={80} />}

                </div>
                <div className={styles.block}>
                    <Radio
                        label={t('customer:setting:language')}
                        flex="column"
                        valueData={dataLang}
                        value={lang}
                        onChange={setLang}
                    />
                </div>
                <div className={styles.footer}>
                    <Button
                        onClick={handleSave}
                        fullWidth={!desktop}
                        align={desktop ? 'left' : 'center'}
                    >
                        <Typography letter="capitalize" color="white" type="bold">
                            {t('common:button:save')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SettingPage;
