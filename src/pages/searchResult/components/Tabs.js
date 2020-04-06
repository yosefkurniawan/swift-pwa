import { Tab as Item, Tabs as Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { GRAY_SECONDARY, PRIMARY } from "@theme/colors";
import { FONT_DEFAULT, FONT_12 } from "@theme/typography";

export const Tabs = withStyles({
  root: {
    borderBottom: `1px solid ${GRAY_SECONDARY}`
  },
  indicator: {
    backgroundColor: PRIMARY
  }
})(Container);

export const Tab = withStyles(theme => ({
  root: {
    textTransform: "uppercase",
    minWidth: 80,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: 0,
    ...FONT_DEFAULT,
    ...FONT_12,
    "&:hover": {
      color: PRIMARY,
      opacity: 1
    },
    "&$selected": {
      color: PRIMARY,
      fontWeight: 'bold'
    },
    "&:focus": {
      color: PRIMARY
    }
  },
  selected: {}
}))(props => <Item disableRipple {...props} />);
