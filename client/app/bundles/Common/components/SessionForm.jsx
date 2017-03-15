import React, { PropTypes } from 'react';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

export default class SessionForm extends React.Component {

  render() {
    if (this.props.currentUser) {
      return (
        <LogoutForm {...this.props}/>
      );
    } else {
      return (
        <LoginForm {...this.props} />
      );
    }
  };
};


