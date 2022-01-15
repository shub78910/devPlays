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
            <i>
              <svg
                className="playListIcon"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                className="scale-13"
              >
                <path
                  d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4V6m16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-8 12.5v-9l6 4.5l-6 4.5z"
                  fill="white"
                ></path>
              </svg>
            </i>
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
