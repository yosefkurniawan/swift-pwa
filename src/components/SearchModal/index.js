import {
    AppBar, Dialog, IconButton, Slide, Toolbar, Grid,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useState } from 'react';
import { GraphCategory } from '@services/graphql';
import { withTranslation } from '@i18n';
import TextField from '@components/Forms/TextField';
import Router from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import { Skeleton } from '@material-ui/lab';
import useStyles from './style';
import Category from './Category';
import SubCategory from './SubCategory';
import SearchDialog from './SearchDialog';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const CategoryWrapperSkeleteon = () => {
    const SkeletonRect = ({ width }) => (
        <Skeleton
            style={{ alignSelf: 'center', marginBottom: '20px' }}
            variant="rect"
            width={width}
            height={24}
            animation="wave"
        />
    );
    return (
        <div style={{ width: '100%' }}>
            <Grid container direction="column" alignItems="center">
                {[100, 60, 180, 65, 150, 70, 80, 175, 70, 55, 115, 60, 155, 65, 80].map((width, i) => (
                    <SkeletonRect key={i} width={width} />
                ))}
            </Grid>
        </div>
    );
};

const CategoryWrapper = (props) => {
    const {
        openedCategory, showCat, openSub, slideCat, showSubCat, closeSub,
    } = props;
    const { loading, data, error } = GraphCategory.getCategories();

    if (loading) return <CategoryWrapperSkeleteon />;
    if (error) return <div>{`Error: ${JSON.stringify(error)}`}</div>;
    if (!data) return <p>Not found</p>;

    return (
        <>
            {!openedCategory.length ? (
                <Category
                    data={data.categoryList[0].children.filter((el) => el.include_in_menu)}
                    open={showCat}
                    {...props}
                    onClick={openSub}
                    direction="right"
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
    );
};

const SearchPage = (props) => {
    const styles = useStyles();
    const [openedCategory, setOpenedCategory] = useState([]);
    const [showCat, setShowCat] = useState(true);
    const [showSubCat, setShowSubCat] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [slideCat, setSlideCat] = useState(false);
    const [value, setValue] = React.useState('');
    const { open } = props;

    const openSub = (cat) => {
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

    const handleCloseModal = () => {
        closeSub();
        setSlideCat(false);
        props.setOpenModal(false);
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            handleCloseModal();
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            handleCloseModal();
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
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
                TransitionComponent={Transition}
            >
                <div className={styles.container}>
                    <AppBar className={styles.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={handleCloseModal}
                                aria-label="close"
                            >
                                <ArrowBack className={styles.iconClose} />
                            </IconButton>
                            <TextField
                                placeholder="Search ..."
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyPress={(e) => handleSearch(e)}
                            />
                            <IconButton
                                disabled={value === ''}
                                edge="start"
                                onClick={searchByClick}
                                aria-label="close"
                            >
                                <SearchIcon className={styles.iconClose} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {open && (
                        <CategoryWrapper
                            {...props}
                            openedCategory={openedCategory}
                            showCat={showCat}
                            openSub={openSub}
                            slideCat={slideCat}
                            showSubCat={showSubCat}
                            closeSub={closeSub}
                        />
                    )}
                </div>
            </Dialog>
        </>
    );
};

export default withTranslation()(SearchPage);
