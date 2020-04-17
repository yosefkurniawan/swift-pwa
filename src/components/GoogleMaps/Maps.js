import React, { Fragment } from "react";
import {
  compose,
  withProps,
  withHandlers,
  withState,
  lifecycle,
} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
const {
  StandaloneSearchBox,
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { useTranslation } from '@i18n'


// const GoogleMaps =

const IcubeMaps = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBW4WSlBcEfik1qxqv3YGcDxD41Lo4we6c&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `210px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    isMarkerShown: true,
  }),
  withHandlers({
    handleDragEnd: ({ dragMarkerDone }) => (event) => {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      dragMarkerDone(newPosition);
    },
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const { location } = refs.searchBox.getPlaces()[0].geometry;
          this.props.getLocation(refs.searchBox.getPlaces())
          this.props.dragMarkerDone({
            lat: location.lat(),
            lng: location.lng(),
          });
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const { mapPosition } = props;
  const { t } = useTranslation()
  return (
    <Fragment>
      <GoogleMap
        defaultZoom={17}
        defaultCenter={mapPosition}
        center={mapPosition}
      >
        {props.isMarkerShown && (
          <Marker
            draggable={true}
            onDragEnd={(event) => props.handleDragEnd(event)}
            position={mapPosition}
          />
        )}
      </GoogleMap>
      <div data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.onPlacesChanged}
        >
          <TextField
            fullWidth
            placeholder={t("common:search:location")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
        </StandaloneSearchBox>
      </div>
    </Fragment>
  );
});

export default IcubeMaps;
