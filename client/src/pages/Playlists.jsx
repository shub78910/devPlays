import React, { useContext } from "react";
import "../styles/video.css";
import videoContext from "../Context/videoContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmptyList from "../components/EmptyList";
const Playlist = () => {
  const { getUser, userFromDb, userId, jwttoken, isShowErrorMsg, change } =
    useContext(videoContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!jwttoken) navigate("/login");
    else {
      getUser(userId);
    }
  }, [change]);

  let playlists = [];
  if (userFromDb?.data.user.playlist !== undefined) {
    playlists = Object.keys(userFromDb?.data.user.playlist);
  }

  return (
    <>
      {playlists?.length === 0 ? (
        <EmptyList message={"You don't have any playlists yet."} />
      ) : (
        <div className="mainPage">
          <h1 style={{ textAlign: "center" }}>Your playlists</h1>
          {isShowErrorMsg ? (
            <h3>
              There is an error, please try after sometime. Invalid/Expired JWT
              token
            </h3>
          ) : (
            <div className="videoListWrapper">
              {playlists?.map((playlistName) => {
                return (
                  <Link
                    className="LinkTagDefault"
                    to={{
                      pathname: `/playlists/${playlistName}`,
                      state: { fromDashboard: true },
                    }}
                    key={playlistName}
                  >
                    <div className="videoGrid">
                      <img
                        alt="playlist"
                        src={`https://i.ytimg.com/vi/${userFromDb?.data?.user?.playlist[playlistName][0]?._id}/0.jpg`}
                      />
                      <br />
                      <br />
                      <h4>Playlist: {playlistName}</h4>
                      <h6>
                        Videos:{" "}
                        {userFromDb?.data?.user?.playlist[playlistName].length}
                      </h6>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Playlist;
