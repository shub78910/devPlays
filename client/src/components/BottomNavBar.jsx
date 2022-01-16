import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import playListIcon from "../assets/playlist.png";

const BottomNavBar = () => {
  return (
    <div className="bottomNavBarWrapper">
      <div>
        <span className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/">
            <i className="fa fa-2x fa-home "></i>
          </Link>
        </span>
        <span className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/playlists">
            <i className="fa fa-list fa-2x  "></i>
          </Link>
        </span>

        <span className="LinkTagDefault">
          <Link className="LinkTagDefault" to="/profile">
            <i className="fa fa-2x fa-user-circle "></i>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default BottomNavBar;
