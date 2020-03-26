import { Slide, Dialog, AppBar, Toolbar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import ButtonField from "./ButtonField";
import Header from "../../../commons/Header";
import CategorySlider from "./Category";
import SubCategorySlider from "./SubCategory";
import SearchDialog from "./SearchDialog";
import useStyles from "../style";
import { ArrowBack } from "@material-ui/icons";

const data = [
  "Subcategory One",
  "Subcategory Two",
  "Subcategory Three",
  "Subcategory Four",
  "Subcategory Five"
];

const dataSub = [
  "Subcategory Level - One",
  "Subcategory Level - Two",
  "Subcategory Level - Three",
  "Subcategory Level - Four",
  "Subcategory Level - Five"
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Component = props => {
  const styles = useStyles();
  const [category, setCategory] = useState("");
  const [showCat, setShowCat] = useState(true);
  const [showSubCat, setShowSubCat] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [slideCat, setSlideCat] = useState(false);
  const openSub = cat => {
    setCategory(cat);
    setShowSubCat(true);
    setShowCat(false);
  };

  const closeSub = () => {
    setCategory("");
    setShowSubCat(false);
    setShowCat(true);
    setSlideCat(true);
  };

  const open = props.open;
  const handleClose = () => {
    props.setOpen(false);
    closeSub()
    setSlideCat(false);
  };

  return (
    <>
      <SearchDialog
        open={openSearch}
        setOpen={() => setOpenSearch(!openSearch)}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className={styles.container}>
          <AppBar className={styles.appBar}>
            <Toolbar>
              <IconButton edge="start" onClick={handleClose} aria-label="close">
                <ArrowBack className={styles.iconClose} />
              </IconButton>
              <ButtonField
                placeholder="Search ..."
                onClick={() => setOpenSearch(true)}
              />
            </Toolbar>
          </AppBar>
          <>
            {category === "" ? (
              <CategorySlider
                data={data}
                open={showCat}
                {...props}
                onClick={openSub}
                direction={'right'}
                slide={slideCat}
              />
            ) : (
              <SubCategorySlider
                data={dataSub}
                open={showSubCat}
                {...props}
                category={category}
                onBack={closeSub}
              />
            )}
          </>
        </div>
      </Dialog>
    </>
  );
};

export default Component;
