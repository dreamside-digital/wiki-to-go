import React, { PropTypes } from 'react';

export default class Map extends React.Component {
  render() {
    return (
      <div className="row cover">
        <div className="map-area map-area-intro">
          <div className="map-loader"></div>
          <div id="map-canvas" style={{ width: '100%', height: '100%' }}> </div>
        </div>
      </div>
    )
  }
};