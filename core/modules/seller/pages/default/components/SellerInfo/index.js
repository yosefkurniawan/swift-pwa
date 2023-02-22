/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable object-curly-newline */
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
import dynamic from 'next/dynamic';
import React from 'react';
import { features } from '@config';
import { getHost } from '@helper_config';

const ItemShare = dynamic(() => import('@core_modules/product/pages/default/components/SharePopup/item'), { ssr: false });

// CHAT FEATURES IMPORT

const ChatContent = dynamic(() => import('@core_modules/customer/plugins/ChatPlugin'), { ssr: false });

// END CHAT FEATURES IMPORT

const SellerInfo = (props) => {
    const { storeConfig, t, dataSeller, errorSeller, loadingSeller, link, sellerId, isLogin, route, handleChat, showChat, ...other } = props;
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
            <Paper elevation={3} className={styles.sellerPaper}>
                <Box className={styles.sellerPanel}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} xm={3} sm={3} md={3} lg={2} className={styles.sellerLogoWrapper}>
                            <Avatar alt="Remy Sharp" src={dataSeller.getSeller[0].logo} className={styles.sellerLogo} variant="rounded" />
                        </Grid>
                        <Grid item xs={9} xm={6} sm={6} md={6} lg={8}>
                            <div className={styles.sellerName}>
                                <Typography type="bold" variant="h2" letter="capitalize">
                                    {dataSeller.getSeller[0].name}
                                </Typography>
                                <Typography variant="span" letter="capitalize">
                                    {dataSeller.getSeller[0].city.split(', ')[0]}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} xm={3} sm={3} md={3} lg={2}>
                            <IconButton onClick={handleOpenInfoPanel}>
                                <InfoIcon className={styles.sellerActionIcon} />
                            </IconButton>
                            {isLogin !== 1 || !showChat ? (
                                <IconButton className={styles.sellerActionIcon} onClick={handleChat}>
                                    <ChatIcon className={styles.sellerActionIcon} />
                                </IconButton>
                            ) : null}
                            <IconButton onClick={handleOpenSharePanel}>
                                <ShareIcon className={styles.sellerActionIcon} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {/* CHAT FEATURES ON DESKTOP */}
                    {features.chatSystem.enable && (
                        <div>
                            {isLogin === 1 && showChat ? (
                                <ChatContent
                                    isSellerPage
                                    handleChatSellerPage={handleChat}
                                    agentSellerCode={dataSeller.getSeller[0].id}
                                    agentSellerName={dataSeller.getSeller[0].name}
                                    sellerMessage={`${getHost() + route.asPath}`}
                                />
                            ) : null}
                        </div>
                    )}
                    {/* END CHAT FEATURES ON DESKTOP */}
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
                                <div dangerouslySetInnerHTML={{ __html: dataSeller.getSeller[0].description }} />
                            </Typography>
                        </div>
                        <div className={styles.address}>
                            <Typography type="bold" variant="h3" letter="capitalize">
                                {t('seller:address')}
                            </Typography>
                            <Typography type="regular" variant="body2">
                                {dataSeller.getSeller[0].address}
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
        </>
    );
};

export default SellerInfo;
