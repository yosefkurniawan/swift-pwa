// Library
import React, { Fragment, useState, useEffect } from "react";
import { AppBar, IconButton, Toolbar, Typography, Box, Button, TextField, Dialog } from "@material-ui/core";
import { ArrowBack, Add, Close, PinDrop } from "@material-ui/icons";
import IcubeMaps from "@components/GoogleMaps/Maps"
import useStyles from "./style.js";

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const [drawer, setDrawer] = useState(false);
    
    const [mapPosition, setMapPosition] = useState({
        lat: -6.197361,
        lng: 106.774535
    })

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log(lng, lat);
        setMapPosition({
            lat: lat,
            lng: lng
        })
    }

    const handleDraweClick = () => {
        setDrawer(!drawer);
    }

    const handleDragPosition = (value) => {
        setMapPosition(value)
    }

    useEffect(() => {
        if(navigator.geolocation){
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    },[]);

    return (
        <Fragment>
            <Box>
                <AppBar
                    position="static"
                    className={[styles.appBar, styles.colorPrimary].join(' ')}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            aria-label="close"
                        >
                            <ArrowBack className={[styles.colorPrimary].join(' ')} />
                        </IconButton>
                        <Typography component="h4" className={[styles.pageTitle].join(' ')}>
                            Address Book
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box>
                    <Box className={[styles.address_shipping].join(' ')}>
                        <Typography
                            className={[styles.address_title].join(' ')}
                            component="p">
                            DEFAULT SHIPPING ADDRESS
                    </Typography>
                        <Box className={[styles.address_content].join(' ')}>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                component="p">
                                Diasty
                        </Typography>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                component="p">
                                Jl Kalibata Timur I no.1 rt.01/rw.01 Pancoran,
                        </Typography>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                component="p">
                                Jakarta Selatan 12740 081234567890
                        </Typography>
                        </Box>
                        <Typography
                            className={[styles.address_edit].join(' ')}
                            component="span"
                            onClick={() => { return handleDraweClick() }}>
                            Edit Address
                    </Typography>
                    </Box>
                    <Box className={[styles.address_billing].join(' ')}>
                        <Typography
                            className={[styles.address_title].join(' ')}
                            component="p">
                            DEFAULT BILLING ADDRESS
                    </Typography>
                        <Box className={[styles.address_content].join(' ')}>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                component="p">
                                Diasty
                        </Typography>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                component="p">
                                Jl Kalibata Timur I no.1 rt.01/rw.01 Pancoran,
                        </Typography>
                            <Typography
                                className={[styles.address_text].join(' ')}
                                component="p">
                                Jakarta Selatan 12740 081234567890
                        </Typography>
                        </Box>
                        <Typography
                            className={[styles.address_edit].join(' ')}
                            component="span"
                            onClick={() => { return handleDraweClick() }}>
                            Edit Address
                    </Typography>
                    </Box>
                </Box>
                <Box className={[styles.address_action].join(' ')}>
                    <Button variant="contained"
                        className={[styles.address_add].join(' ')}
                        onClick={() => { return handleDraweClick() }}>
                        <span style={{ marginRight: "15px" }}>
                            Add New Address
                        </span>
                        <Add />
                    </Button>
                </Box>

            </Box>
            <Dialog
                fullScreen
                open={drawer}
                className={[styles.address_drawer].join(' ')}
            >
                <div style={{ width: "100%" }}>
                    <AppBar
                        position="static"
                        className={[styles.appBar, styles.colorPrimary].join(' ')}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                aria-label="close"
                                onClick={() => { return handleDraweClick() }}
                            >
                                <Close
                                    className={[styles.colorPrimary].join(' ')}
                                />
                            </IconButton>
                            <Typography component="h4" className={[styles.pageTitle].join(' ')}>
                                Edit Address
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box className={[styles.address_form].join(' ')}>
                        <form>
                            <TextField
                                label="Name"
                                defaultValue="Name"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <TextField
                                label="Last Name"
                                defaultValue="Last Name"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <TextField
                                label="Street Address"
                                defaultValue="Street Address"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <TextField
                                label="Country"
                                defaultValue="Country"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <TextField
                                label="State/Province"
                                defaultValue="State/Province"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <TextField
                                label="City"
                                defaultValue="City"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <TextField
                                label="District/Kecamatan"
                                defaultValue="District/Kecamatan"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <TextField
                                label="Postal Code"
                                defaultValue="Postal Code"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <TextField
                                label="Phone Number"
                                defaultValue="Phone Number"
                                fullWidth
                                className={[styles.form_input].join(' ')}
                            />
                            <Box style={{width:`100%`, height:`450px`}}>
                                <IcubeMaps
                                    height='300px'
                                    mapPosition={mapPosition}
                                    dragMarkerDone={handleDragPosition}
                                />
                            </Box>
                            <Button variant="contained"
                                className={[styles.address_save].join(' ')}
                                onClick={() => { return handleDraweClick() }}>
                                <span style={{ marginRight: "15px" }}>
                                    SAVE
                                </span>
                            </Button>
                        </form>
                    </Box>
                    
                </div>
            </Dialog>
        </Fragment>
    );
};

export default Content;