import React, { Fragment } from "react"
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const IcubeMaps = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBW4WSlBcEfik1qxqv3YGcDxD41Lo4we6c&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `200px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withState('state', 'setState', {
        mapProps:{ 
            lat: -7.709487,
            lng: 110.304564 
        }
    }),
    withHandlers({
        handleDragEnd: ({setState}) => (event) => {
            setState({
                mapProps:{
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                }
            }) 
        }
    }),
    withScriptjs,
    withGoogleMap)
    ((props) => {
        return (
            <Fragment>
                <GoogleMap
                    defaultZoom={17}
                    defaultCenter={props.state.mapProps}
                >
                    {props.isMarkerShown && 
                        <Marker 
                            draggable={true}
                            onDragEnd={(event)=>props.handleDragEnd(event)}
                            position={props.state.mapProps}
                            />}
                </GoogleMap>
            </Fragment>
        )
    }
)

export default IcubeMaps