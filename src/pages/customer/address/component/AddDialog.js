import React, { useState, useEffect } from "react";
import TextField from "@components/Forms/TextField";
import Typography from "@components/Typography";
import IcubeMaps from "@components/GoogleMaps/Maps";
import Button from "@components/Button";
import Header from "@components/Header";
import { Box, Dialog } from "@material-ui/core";
import useStyles from "./style";
import { regexPhone } from "@helpers/regex";
import { useFormik } from "formik";
import * as Yup from "yup";
import Router from "next/router";

const AddAddressDialog = (props) => {
  const {
    firstName = "",
    lastName = "",
    street = "",
    posCode = "",
    country = "",
    state = "",
    city = "",
    district = "",
    phoneNumber = "",
    value = "",
    maps = "",
    open,
    t,
    setOpen,
  } = props;
  const styles = useStyles();
  const headerConfig = {
    headerTitle: t("customer:address:addTitle"),
    header: "relative",
    headerBackIcon: "close",
  };

  const [mapPosition, setMapPosition] = useState({
    lat: -6.197361,
    lng: 106.774535,
  });

  const [location, setLocation] = useState(null);

  const displayLocationInfo = (position) => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    // console.log(lng, lat);
    setMapPosition({
      lat: lat,
      lng: lng,
    });
  };

  const handleDraweClick = () => {
    setDrawer(!drawer);
  };

  const handleDragPosition = (value) => {
    setMapPosition(value);
  };

  const AddressSchema = Yup.object().shape({
    firstName: Yup.string().required(t("validate:firstName:required")),
    lastName: Yup.string().required(t("validate:lastName:required")),
    phoneNumber: Yup.string()
      .required(t("validate:phoneNumber:required"))
      .matches(regexPhone, t("validate:phoneNumber:wrong")),
    street: Yup.string()
      .required(t("validate:street:required"))
      .min(10, t("validate:street:wrong")),
    posCode: Yup.string()
      .required(t("validate:postal:required"))
      .min(3, t("validate:postal:wrong"))
      .max(20, t("validate:postal:wrong")),
    country: Yup.string().required(t("validate:country:required")),
    state: Yup.string().required(t("validate:state:required")),
    city: Yup.string().required(t("validate:city:required")),
    district: Yup.string().required(t("validate:district:required")),
  });

  const formik = useFormik({
    initialValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: phoneNumber || "",
      street: street || "",
      country: country || "",
      state: state || "",
      city: city || "",
      district: district || "",
      posCode: posCode || "",
      maps: maps || "",
    },
    validationSchema: AddressSchema,
    onSubmit: (values) => {
      console.log(values);
      setOpen();
    },
  });

  const handlePin = () => {
    if (location) {
      location[0].address_components &&
        location[0].address_components.map((item) => {
          item.types.length > 0 && item.types[0] === "country"
            ? formik.setFieldValue("country", item.long_name || "")
            : item.types[0] === "postal_code"
            ? formik.setFieldValue("posCode", item.long_name || "")
            : item.types[0] === "administrative_area_level_1"
            ? formik.setFieldValue("state", item.long_name || "")
            : item.types[0] === "administrative_area_level_2"
            ? formik.setFieldValue("city", item.long_name || "")
            : item.types[0] === "administrative_area_level_3" &&
              formik.setFieldValue("district", item.long_name || "");
        });
      location[0].formatted_address &&
        formik.setFieldValue("street", location[0].formatted_address);
      location[0].formatted_phone_number &&
        formik.setFieldValue("phoneNumber", location[0].formatted_phone_number);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      className={[styles.address_drawer].join(" ")}
    >
      <div style={{ width: "100%" }}>
        <Header
          pageConfig={headerConfig}
          LeftComponent={{
            onClick: setOpen,
          }}
        />
        <Box className={[styles.address_form].join(" ")}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? true
                  : false
              }
              errorMessage={
                (formik.touched.firstName && formik.errors.firstName) || null
              }
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={
                formik.touched.lastName && formik.errors.lastName ? true : false
              }
              errorMessage={
                (formik.touched.lastName && formik.errors.lastName) || null
              }
            />
            <TextField
              label="Street Address"
              name="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              error={
                formik.touched.street && formik.errors.street ? true : false
              }
              errorMessage={
                (formik.touched.street && formik.errors.street) || null
              }
            />
            <TextField
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={
                formik.touched.country && formik.errors.country ? true : false
              }
              errorMessage={
                (formik.touched.country && formik.errors.country) || null
              }
            />
            <TextField
              label="State/Province"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && formik.errors.state ? true : false}
              errorMessage={
                (formik.touched.state && formik.errors.state) || null
              }
            />
            <TextField
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && formik.errors.city ? true : false}
              errorMessage={(formik.touched.city && formik.errors.city) || null}
            />
            <TextField
              label="District/Kecamatan"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              error={
                formik.touched.district && formik.errors.district ? true : false
              }
              errorMessage={
                (formik.touched.district && formik.errors.district) || null
              }
            />
            <TextField
              label="Postal Code"
              name="posCode"
              value={formik.values.posCode}
              onChange={formik.handleChange}
              error={
                formik.touched.posCode && formik.errors.posCode ? true : false
              }
              errorMessage={
                (formik.touched.posCode && formik.errors.posCode) || null
              }
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? true
                  : false
              }
              errorMessage={
                (formik.touched.phoneNumber && formik.errors.phoneNumber) ||
                null
              }
            />
            <Box style={{ width: `100%`, height: `230px` }}>
              <IcubeMaps
                height="230px"
                mapPosition={mapPosition}
                dragMarkerDone={handleDragPosition}
                getLocation={setLocation}
              />
            </Box>
            <Button
              className={styles.addBtn}
              onClick={handlePin}
              variant="outlined"
              size="small"
            >
              pin location
            </Button>

            <Button className={styles.addBtn} fullWidth={true} type="submit">
              <Typography variant="title" type="regular" letter="capitalize">
                {t("common:button:save")}
              </Typography>
            </Button>
          </form>
        </Box>
      </div>
    </Dialog>
  );
};

export default AddAddressDialog;
