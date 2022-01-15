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
            <i>
              <svg
                className="playListIcon"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="scale-13"
              >
                <path
                  d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4V6m16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-8 12.5v-9l6 4.5l-6 4.5z"
                  fill="white"
                ></path>
              </svg>
            </i>
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
