class SessionForm extends React.Component {

  render() {
    if (this.props.current_user) {
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


