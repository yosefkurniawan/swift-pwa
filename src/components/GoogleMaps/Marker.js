import { Marker } from "react-google-maps";
import { Component } from "react";

class IcubeMarker extends Component{
    render(){
        return(
            <Marker google={this.props.google}
                name={'Dolores park'}
                    draggable={true}
                    onDragEnd={ this.onMarkerDragEnd }
                        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                />
        )
    }
}

export default IcubeMarker;