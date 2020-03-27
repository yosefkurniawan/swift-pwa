import { makeStyles } from "@material-ui/core";
import { GRAY_PRIMARY, PRIMARY, WHITE, GRAY_SECONDARY } from "../../../../theme/colors";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    backgroundColor: WHITE,
    border : `1px solid ${GRAY_SECONDARY}`,
    backgroundColor: WHITE,
    "$root.Mui-focusVisible &": {
      outline: "1px auto #000",
      outlineOffset: 1
    },
    "input:hover ~ &": {
      backgroundColor: 'transparent'
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: GRAY_PRIMARY
    }
  },
  checkedIcon: {
    backgroundColor: 'transparent',
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundColor: PRIMARY,
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: GRAY_SECONDARY
    }
  }
});

export default useStyles