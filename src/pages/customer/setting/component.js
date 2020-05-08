import Checkbox from '@components/Forms/CheckBox';
import Radio from '@components/Forms/Radio';
import Button from '@components/Button';
import { languagesLabel } from '@config';
import { getToken } from '@helpers/token';
import { useMutation } from '@apollo/react-hooks';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './style';
import * as Schema from './services/schema';

const subData = [{ value: 'general', label: 'Subscribtion' }];

const SettingPage = ({ t, i18n }) => {
    const { languages, language } = i18n;
    const dataLang = [];
    languages.forEach((lang) => {
        dataLang.push({
            label: languagesLabel[lang],
            value: lang,
        });
    });
    let tokenCustomer = '';

    if (typeof window !== 'undefined') {
        tokenCustomer = getToken();
    }
    const [backdrop, setBackdrop] = React.useState(false);
    const styles = useStyles();
    const [subcribe, setSubcribe] = React.useState([]);
    const [lang, setLang] = React.useState(language);

    const [actUpdateCustomer, resultUpdate] = useMutation(Schema.updateCustomer);
    if (!resultUpdate.loading && backdrop) {
        setBackdrop(false);
    }
    const handleSave = () => {
        setBackdrop(true);
        actUpdateCustomer({
            variables: {
                isSubscribed: true,
            },
            context: {
                headers: tokenCustomer && tokenCustomer !== '' ? {
                    Authorization: `Bearer ${tokenCustomer}`,
                } : {},
            },
        });
        i18n.changeLanguage(lang);
    };
    return (
        <div className={styles.container}>
            <Backdrop className={styles.backdrop} open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={styles.block}>
                <Checkbox
                    label={t('customer:setting:newslater')}
                    flex="column"
                    data={subData}
                    value={subcribe}
                    onChange={setSubcribe}
                />
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
                <Button onClick={handleSave} fullWidth>{t('common:button:save')}</Button>
            </div>
        </div>
    );
};

export default SettingPage;
