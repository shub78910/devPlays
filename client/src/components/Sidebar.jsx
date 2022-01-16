import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebarWrapper displayInMobile">
      <div>
        <h4 className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/">
            <i className="fa fa-home "></i>
            <span>Home</span>
          </Link>
        </h4>
        <h4 className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/playlists">
            <i className="fa fa-list "></i>
            <span>Playlists</span>
          </Link>
        </h4>
        <h4 className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/liked">
            <i className="fa fa-thumbs-up "></i>
            <span>Liked</span>
          </Link>
        </h4>
        <h4 className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/history">
            <i className="fa fa-history"></i>
            <span>History</span>
          </Link>
        </h4>
        <h4 className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/watchLater">
            <i className="fa fa-clock-o "></i>
            <span>Watch later</span>
          </Link>
        </h4>
        <h4 className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/profile">
            <i className="fa fa-user-circle "></i>
            <span>My profile</span>
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Sidebar;
