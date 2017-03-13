import React, { PropTypes } from 'react';

export default class Notification extends React.Component {
  render() {
    return (
      <div id="js-flash-message" className="col-md-12 flash-messages hidden"></div>
    )
  }
};