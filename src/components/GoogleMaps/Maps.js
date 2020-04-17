/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
    compose, withProps, withHandlers, lifecycle,
} from 'recompose';
import {
    withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';

const { StandaloneSearchBox } = require('react-google-maps/lib/components/places/StandaloneSearchBox');

// const GoogleMaps =


const IcubeMaps = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBW4WSlBcEfik1qxqv3YGcDxD41Lo4we6c&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '200px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
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
                    this.props.dragMarkerDone({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                },
            });
        },
    }),
    withScriptjs,
    withGoogleMap,
)((props) => {
    const { mapPosition } = props;
    return (
        <>
            <GoogleMap
                defaultZoom={17}
                defaultCenter={mapPosition}
                center={mapPosition}
            >
                {props.isMarkerShown
                    && (
                        <Marker
                            draggable
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
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid transparent',
                            width: '100%',
                            height: '32px',
                            padding: '0 12px',
                            borderRadius: '3px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '14px',
                            outline: 'none',
                            textOverflow: 'ellipses',
                        }}
                    />
                </StandaloneSearchBox>
            </div>
        </>
    );
});

export default IcubeMaps;
