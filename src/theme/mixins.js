export const CreatePadding = (top = 0, right = 0, bottom = 0, left = 0) => {
  return {
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left
  };
};

export const CreateMargin = (top = 0, right = 0, bottom = 0, left = 0) => {
  return {
    marginTop: top,
    marginRight: right,
    marginBottom: bottom,
    marginLeft: left
  };
};

export const FlexRow = {
  display: "flex",
  flexDirection: "row"
};

export const FlexColumn = {
  display: "flex",
  flexDirection: "column"
};

export const Centering = {
  ...FlexColumn,
  justifyContent: "center",
  alignItems: "center"
};

export const showHide = {
  show: {
    display: "block"
  },
  hide: {
    display: "none"
  }
};

export const ClearMarginPadding = {
  margin: 0,
  padding: 0
};

export const CenterAbsolute = {
  left: "50%",
  "-webkit-transform": "translateX(-50%)",
  transform: " translateX(-50%)"
};
