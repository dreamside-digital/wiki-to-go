import React, { PropTypes } from 'react';

import InitialSearch from './InitialSearch';
import Navbar from '../../Common/components/Navbar';
import { Notification } from '../../Common/components/Notification';
import Map from '../../Common/components/Map';
import RegistrationModal from '../../Common/components/RegistrationModal';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      location: null,
      notificationMessage: null,
      searchResults: [],
      savedArticles: [],
    };
    this.updateUser = () => this._updateUser();
    this.updateLocation = () => this._updateLocation();
    this.notify = () => this._notify();
  };

  render() {
    return (
      <div>
        <Navbar
          updateUser={ this.updateUser }
          currentUser={ this.state.currentUser }
          notify={ this.notify }
          {...this.props}
        />
        <Notification message={ this.state.notificationMessage }/>
        <Map location={ this.state.location } />
        <InitialSearch updateLocation={ this.updateLocation } />
        <RegistrationModal updateUser={ this.updateUser } { ...this.props } />
      </div>
    )
  }

  _updateUser(currentUser) {
    this.setState({ currentUser });
  };

  _updateLocation(location) {
    this.setState({ location });
  };

  _notify(notificationMessage) {
    this.setState({ notificationMessage });
    window.setTimeout(this.setState({ notificationMessage: null }), 4000)
  }
};
