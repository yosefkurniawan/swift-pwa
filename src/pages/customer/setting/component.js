import useStyles from "./style";
import Checkbox from "@components/Forms/CheckBox";
import Radio from "@components/Forms/Radio";
import Button from "@components/Button";
import { languagesLabel } from "@config";

const subData = [{ value: "general", label: "Subscribtion" }];

const SettingPage = ({ t, i18n }) => {
  const { languages, language } = i18n;
  let dataLang = [];
  languages.map((lang) => {
    dataLang.push({
      label: languagesLabel[lang],
      value: lang,
    });
  });
  const styles = useStyles();
  const [subcribe, setSubcribe] = React.useState([]);
  const [lang, setLang] = React.useState(language);

  const handleSave = () => {
    i18n.changeLanguage(lang)
  }


  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <Checkbox
          label={t("customer:setting:newslater")}
          flex="column"
          data={subData}
          value={subcribe}
          onChange={setSubcribe}
        />
      </div>
      <div className={styles.block}>
        <Radio
          label={t("customer:setting:language")}
          flex="column"
          valueData={dataLang}
          value={lang}
          onChange={setLang}
        />
      </div>
      <div className={styles.footer}>
        <Button onClick={handleSave} fullWidth={true}>{t("common:button:save")}</Button>
      </div>
    </div>
  );
};

export default SettingPage;
