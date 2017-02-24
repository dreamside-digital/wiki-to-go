class App extends React.Component {

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
        <SecondaryNavbar />
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