import React, { PropTypes } from 'react';

const Notification = ({ message }) => {
  const hidden = message ? '' : 'hidden';

  return (
    <div id="js-flash-message" className={'col-md-12 flash-messages'}>
      { message }
    </div>
  )
};

export default Notification;