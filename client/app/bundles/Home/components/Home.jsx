import React, { PropTypes } from 'react';

import InitialSearch from './InitialSearch';
import Navbar from '../../Common/components/Navbar';
import Notification from '../../Common/components/Notification';
import Map from '../../Common/components/Map';
import RegistrationModal from '../../Common/components/RegistrationModal';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: false,
      search_results: [],
      saved_articles: [],
    };
    this._updateUser = this._updateUser.bind(this);
  };

  render() {
    return (
      <div>
        <Navbar updateUser={this._updateUser} current_user={this.state.current_user} {...this.props} />
        <Notification />
        <Map />
        <InitialSearch />
        <RegistrationModal updateUser={this._updateUser} {...this.props} />
      </div>
    )
  }

  _updateUser(user) {
    this.setState({
      current_user: user,
    });
  };
};
