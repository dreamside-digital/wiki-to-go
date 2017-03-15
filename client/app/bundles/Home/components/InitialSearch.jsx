import React, { PropTypes } from 'react';

import GeolocationHelper from '../../../helpers/GeolocationHelper';
import GoogleGeocodeHelper from '../../../helpers/GoogleGeocodeHelper';


export default class InitialSearch extends React.Component {
  getCurrentLocation () {
    GeolocationHelper.currentLocation().then(this.parent);
  }

  getLocationFromQuery (input) {
    GoogleGeocodeHelper.geocodeAddress(input);
  }

  render() {
    return (
      <div className="initial-search col-md-12">
        <div className="title-area">
          <h1><span className="light">Wiki </span><span className="heavy">To Go</span></h1>
          <ul className="list-unstyled">
            <li><h3>search wikipedia by location</h3></li>
            <li><h3>save your favourite articles</h3></li>
            <li><h3>export your saved articles to take with you</h3></li>
          </ul>

          <div className="search-coords">
            <button onClick={ this.searchByCurrentLocation } id="get-loc" className="btn btn-default highlight-btn">
              Search near you <span className="glyphicon glyphicon-screenshot" aria-hidden="true"></span>
            </button>
            <input type="text" name="query" id="search-query" placeholder="Search by location" />
          </div>
        </div>
      </div>
    )
  }
}
