/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable object-curly-newline */
import GridList from '@common_gridlist';
import TabView from '@common_tabs';
import Typography from '@common_typography';
import useStyles from '@core_modules/seller/pages/default/components/style';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ShareIcon from '@material-ui/icons/Share';
import DetailProductView from '@plugin_productitem/components/Detail';
import ImageProductView from '@plugin_productitem/components/Image';
import CoreBase from '@plugin_productlist/core';
import dynamic from 'next/dynamic';
import React from 'react';

const ErrorMessage = dynamic(() => import('@plugin_productlist/components/ErrorMessage'), { ssr: false });
const ProductListSkeleton = dynamic(() => import('@plugin_productlist/components/ProductListSkeleton'), { ssr: false });
const FilterView = dynamic(() => import('@plugin_productlist/components/Filter/view'), { ssr: false });
const FilterModalView = dynamic(() => import('@plugin_productlist/components/Filter/FilterDialog'), { ssr: false });

const ItemShare = dynamic(() => import('@core_modules/product/pages/default/components/SharePopup/item'), { ssr: false });

const Content = (props) => {
    const { storeConfig, t, data, error, loading, link, sellerId, ...other } = props;
    const styles = useStyles();

    const [openInfoPanel, setOpenInfoPanel] = React.useState(false);
    const [openSharePanel, setOpenSharePanel] = React.useState(false);

    const handleOpenInfoPanel = () => {
        setOpenInfoPanel(true);
    };

    const handleOpenSharePanel = () => {
        setOpenSharePanel(true);
    };

    const handleCloseInfoPanel = () => {
        setOpenInfoPanel(false);
    };

    const handleCloseSharePanel = () => {
        setOpenSharePanel(false);
    };

    return (
        <>
            {!loading && data && data.getSeller.length === 0 && (
                <Typography type="bold" variant="h4" letter="capitalize" style={{ paddingBottom: '1rem', paddingLeft: '1rem' }}>
                    {t('seller:notFound')}
                </Typography>
            )}
            {data && data.getSeller.length > 0 && (
                <>
                    <Paper elevation={3} className={styles.sellerPaper}>
                        <Box className={styles.sellerPanel}>
                            <Grid container spacing={2}>
                                <Grid item xs={3} xm={3} sm={3} md={3} lg={2} className={styles.sellerLogoWrapper}>
                                    <Avatar alt="Remy Sharp" src={data.getSeller[0].logo} className={styles.sellerLogo} />
                                </Grid>
                                <Grid item xs={9} xm={6} sm={6} md={6} lg={8}>
                                    <div className={styles.sellerName}>
                                        <Typography type="bold" variant="h2" letter="capitalize">
                                            {data.getSeller[0].name}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {data.getSeller[0].city.split(', ')[0]}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12} xm={3} sm={3} md={3} lg={2}>
                                    <IconButton onClick={handleOpenInfoPanel}>
                                        <InfoIcon className={styles.sellerActionIcon} />
                                    </IconButton>
                                    <IconButton className={styles.sellerActionIcon}>
                                        <ChatIcon className={styles.sellerActionIcon} />
                                    </IconButton>
                                    <IconButton onClick={handleOpenSharePanel}>
                                        <ShareIcon className={styles.sellerActionIcon} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                    <Dialog
                        open={openInfoPanel}
                        onClose={handleCloseInfoPanel}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className={styles.sellerInfoPanel}
                    >
                        <DialogTitle id="alert-dialog-title">
                            {' '}
                            <IconButton onClick={handleCloseInfoPanel} className={styles.closePanelIcon}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <div className={styles.description}>
                                    <Typography type="bold" variant="h3" letter="capitalize">
                                        {t('seller:description')}
                                    </Typography>
                                    <Typography type="regular" variant="body2">
                                        <div dangerouslySetInnerHTML={{ __html: data.getSeller[0].description }} />
                                    </Typography>
                                </div>
                                <div className={styles.address}>
                                    <Typography type="bold" variant="h3" letter="capitalize">
                                        {t('seller:address')}
                                    </Typography>
                                    <Typography type="regular" variant="body2">
                                        {data.getSeller[0].address}
                                    </Typography>
                                </div>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={openSharePanel}
                        onClose={handleCloseSharePanel}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className={styles.sharePanel}
                    >
                        <DialogTitle id="alert-dialog-title">
                            {' '}
                            <IconButton onClick={handleCloseSharePanel} className={styles.closePanelIcon}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <div className={styles.description}>
                                    <Typography type="bold" variant="h3" letter="capitalize">
                                        {t('seller:share')}
                                    </Typography>
                                </div>
                                <div className={styles.address}>
                                    <ItemShare link={link} />
                                </div>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                    <div className={styles.sellerProduct}>
                        <Typography type="bold" variant="h2" letter="capitalize" style={{ paddingBottom: '1rem', paddingLeft: '1rem' }}>
                            {t('seller:popularProducts')}
                        </Typography>
                        <CoreBase
                            t={t}
                            ErrorMessage={ErrorMessage}
                            ProductListSkeleton={ProductListSkeleton}
                            ImageProductView={ImageProductView}
                            DetailProductView={DetailProductView}
                            TabView={TabView}
                            FilterView={FilterView}
                            FilterModalView={FilterModalView}
                            defaultSort={{ key: 'position', value: 'ASC' }}
                            {...props}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default Content;
