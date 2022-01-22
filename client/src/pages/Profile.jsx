import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoContext from "../Context/videoContext";
import "../styles/profile.css";
import youtubeIcon from "../assets/youtube.png";

import { Button } from "react-bootstrap";

const Profile = () => {
  const { userFromDb, jwttoken, getUser, userId, change, isShowErrorMsg } =
    useContext(videoContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!jwttoken) navigate("/login");
    else {
      getUser(userId);
    }
  }, [change]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  //add validation here as well.

  return (
    <>
      <div className="mainPage myProfileWrapper">
        {isShowErrorMsg ? (
          <h3>
            There is an error, please try after sometime. Invalid/Expired JWT
            token
          </h3>
        ) : (
          <>
            <h1 style={{ textAlign: "center" }}>Your Profile</h1>
            <div>
              <span>Name: </span>
              <strong>{userFromDb?.data.user.fullName}</strong>
            </div>
            <div>
              <span>Email: </span>
              <strong>{userFromDb?.data.user.email}</strong>
            </div>

            <div className="profileLists">
              <ul>
                <li className="LinkTagDefault">
                  <Link className="LinkTagDefault" to="/playlists">
                    <i className="fa fa-list "></i>
                    <span>Playlists</span>
                  </Link>
                </li>
                <li className="LinkTagDefault">
                  <Link className="LinkTagDefault" to="/liked">
                    <i className="fa fa-thumbs-up "></i>
                    <span>Liked</span>
                  </Link>
                </li>
                <li className="LinkTagDefault">
                  <Link className="LinkTagDefault" to="/history">
                    <i className="fa fa-history"></i>
                    <span>History</span>
                  </Link>
                </li>
                <li className="LinkTagDefault">
                  <Link className="LinkTagDefault" to="/watchLater">
                    <i className="fa fa-clock-o "></i>
                    <span>Watch later</span>
                  </Link>
                </li>
              </ul>
            </div>

            <Link to="/video/addNewVideo">
              <Button variant="dark" className="logoutBtn">
                Add a new YouTube video{" "}
                <img
                  src={youtubeIcon}
                  width={30}
                  height={30}
                  className="mx-2"
                />
              </Button>
            </Link>

            <Button className="logoutBtn" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
