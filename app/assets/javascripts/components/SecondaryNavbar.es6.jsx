class SecondaryNavbar extends React.Component {
  render() {
    return (
      <nav className="navbar-secondary navbar" style={{zIndex: 4}}>
        <div className="container-fluid"> 
          <div className="navbar-header">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <a href="#" id="show-search-btn">Search again <span className="glyphicon glyphicon-search" aria-hidden="true"></span></a> 
              </li>
              <li> 
                <a href="#" id="switch-results-view">
                  <span id="list-view-text">List view </span>
                  <span id="map-view-text" style={{display: 'none'}}>Map view</span>
                  <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                </a>
              </li>
              <li className="dropdown current-collection">
                <a href="#" className="dropdown-toggle menu-white-text" data-toggle="dropdown" role="button" aria-expanded="false"> Articles (<span id="article-count">0</span>)</a>
                  <ul className="dropdown-menu" role="menu">
                    <li id="placeholder"><a>You haven't added any articles yet</a></li>
                    <li id="save-articles-collection" style={{display: 'none'}} data-toggle="modal" data-target="#save-book-modal"><a>Save these articles</a></li>
                  </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
};