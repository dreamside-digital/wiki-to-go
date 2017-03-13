import GeolocationHelper from '../../../helpers/GeolocationHelper';

class InitialSearch extends React.Component {

  getLocation () {
    console.log('getting location');
    const location = GeolocationHelper.currentLocation();
    console.log(location);
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
            <button onClick={ this.getLocation } id="get-loc" className="btn btn-default highlight-btn">
              Search near you <span className="glyphicon glyphicon-screenshot" aria-hidden="true"></span>
            </button>
            <input type="text" name="query" id="search-query" placeholder="Search by location" />
          </div>
        </div>
      </div>
    )
  }
}