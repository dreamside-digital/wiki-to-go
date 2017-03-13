import React, { PropTypes } from 'react';

import SessionForm from './SessionForm';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Wiki To Go</a>
          </div>

          <div className="collapse navbar-collapse" id="navbar-collapse">
            <SessionForm {...this.props} />
          </div>
        </div>
      </nav>

    );
  };
};
