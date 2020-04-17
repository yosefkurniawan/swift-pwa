const currencyFormatter = require("currency-formatter");
import Typography from "@components/Typography";

const dummyCode = "IDR";

export default ({ value = 0, code = dummyCode, defaultSet = false, ...other }) => {
  let format = {
    code,
    decimal: ",",
    thousand: ".",
    precision: 0,
    format: "%s %v",
  };
  format = (code === "IDR" && defaultSet === false) ? {...format, symbol : 'IDR'} : {...format}
  return (
    <Typography variant="span" type="bold" letter="uppercase" {...other}>
      {currencyFormatter.format(value, format)}
    </Typography>
  );
};
