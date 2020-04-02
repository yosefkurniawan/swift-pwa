import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useState } from "react";
import useStyles from "../style";
import ButtonField from "./ButtonField";
import Category from "./Category";
import SubCategory from "./SubCategory";
import SearchDialog from "./SearchDialog";
import { GraphCategory } from "../../../../services/graphql";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const SearchPage = props => {
    const styles = useStyles();
    const [openedCategory, setOpenedCategory] = useState([]);
    const [showCat, setShowCat] = useState(true);
    const [showSubCat, setShowSubCat] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [slideCat, setSlideCat] = useState(false);

    const { loading, data, error } = GraphCategory.getCategories();

    if (loading && !data) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {JSON.stringify(error)}</div>;
    }

    const openSub = cat => {
        setOpenedCategory([cat]);
        setShowSubCat(true);
        setShowCat(false);
    };

    const closeSub = () => {
        setOpenedCategory([]);
        setShowSubCat(false);
        setShowCat(true);
        setSlideCat(true);
    };

    const open = props.open;
    const handleClose = () => {
        props.setOpen(false);
        closeSub();
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
                            <IconButton
                                edge="start"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <ArrowBack className={styles.iconClose} />
                            </IconButton>
                            <ButtonField
                                placeholder="Search ..."
                                onClick={() => setOpenSearch(true)}
                            />
                        </Toolbar>
                    </AppBar>
                    <>
                        {!openedCategory.length ? (
                            <Category
                                data={data.categoryList[0].children}
                                open={showCat}
                                {...props}
                                onClick={openSub}
                                direction={"right"}
                                slide={slideCat}
                            />
                        ) : (
                            <SubCategory
                                data={openedCategory}
                                open={showSubCat}
                                {...props}
                                onBack={closeSub}
                            />
                        )}
                    </>
                </div>
            </Dialog>
        </>
    );
};

export default SearchPage;
