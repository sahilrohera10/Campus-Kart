import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class FoodMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div
        style={{
          height: "80vh",
          width: "50%",
          paddingTop: "200px",
          marginLeft: "20px",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCYWReSqt0L9H_WmKVp_f4KGjqawjmUXA4" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={30.733315} lng={76.779419} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default FoodMap;
