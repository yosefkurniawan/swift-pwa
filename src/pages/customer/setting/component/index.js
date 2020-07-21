import Radio from '@components/Forms/Radio';
import Button from '@Button';
import { languagesLabel } from '@config';
import { useMutation } from '@apollo/react-hooks';
import Skeleton from '@material-ui/lab/Skeleton';
import { GraphCustomer } from '@services/graphql';
import useStyles from '../style';
import * as Schema from '../services/schema';
import CheckboxSettings from './checkbox';

const subData = [{ value: 'subscribed', label: 'Subscribtion' }];

const SettingPage = ({ t, i18n }) => {
    const { languages, language } = i18n;
    const dataLang = [];
    languages.forEach((lang) => {
        dataLang.push({
            label: languagesLabel[lang],
            value: lang,
        });
    });

    const [settings, setSettings] = React.useState({
        is_subscribed: false,
    });
    const styles = useStyles();
    const [lang, setLang] = React.useState(language);

    const [actUpdateCustomer, resultUpdate] = useMutation(Schema.updateCustomer);
    if (!resultUpdate.loading) {
        if (typeof window !== 'undefined') window.backdropLoader(false);
    }
    const handleSave = () => {
        window.backdropLoader(true);
        actUpdateCustomer({
            variables: {
                isSubscribed: settings.is_subscribed,
            },
            context: {
                request: 'internal',
            },
        });
        i18n.changeLanguage(lang);
    };
    let customer = {};
    if (typeof window !== 'undefined') {
        const { data } = GraphCustomer.getCustomer();
        if (data && data.customer) {
            customer = data.customer;
        }
    }
    React.useEffect(() => {
        if (customer.is_subscribed) {
            setSettings({
                ...{
                    is_subscribed: true,
                },
            });
        }
    }, [customer]);
    return (
        <div className={styles.container}>
            <div className={styles.block}>
                {typeof customer.is_subscribed !== 'undefined' ? (
                    <CheckboxSettings
                        name="is_subscribed"
                        t={t}
                        value={customer.is_subscribed ? ['subscribed'] : []}
                        setSettings={setSettings}
                        data={subData}
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
                    rootClassName={styles.btnContainer}
                    className={styles.btnSave}
                    onClick={handleSave}
                >
                    {t('common:button:save')}
                </Button>
            </div>
        </div>
    );
};

export default SettingPage;
