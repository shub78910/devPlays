import axios from "axios";
import { useEffect, useState } from "react";
import videoContext from "./videoContext";

export const VideoState = (props) => {
  const [fetchedVids, setFetchedVids] = useState([]);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [userFromDb, setUserFromDb] = useState();
  const [isShowErrorMsg, setIsShowErrorMsg] = useState(false);
  const [change, setChange] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const userName = JSON.parse(localStorage.getItem("userName"));

  const jwttoken = JSON.parse(localStorage.getItem("jwttoken"));

  const [loader, setLoader] = useState(false);

  const signUp = async (form) => {
    try {
      setLoader(true);
      const userData = await axios.post("/auth/register", form);
      setLoader(false);
      setIsShowErrorMsg(false);
      return userData;
    } catch (error) {
      setIsShowErrorMsg(true);
      console.log(error);
    }
  };

  const signIn = async (form) => {
    try {
      setLoader(true);
      const userData = await axios.post("/auth/login", form);
      setLoader(false);
      if (userData.status === 201) {
        localStorage.setItem("jwttoken", JSON.stringify(userData.data.token));
        localStorage.setItem(
          "userId",
          JSON.stringify(userData?.data?.user?._id)
        );
        localStorage.setItem(
          "userName",
          JSON.stringify(userData?.data?.user?.fullName)
        );
      }
      setIsShowErrorMsg(false);
      return userData;
    } catch (error) {
      setIsShowErrorMsg(true);
      return error;
    }
  };

  const getVideos = async () => {
    try {
      setLoader(true);
      const videos = await axios.get("/home");
      setLoader(false);
      setFetchedVids(videos.data.videos);
      setIsShowErrorMsg(false);
      setChange(!change);
      return videos;
    } catch (error) {
      setIsShowErrorMsg(true);
      return {
        message: "There is some problem with the server.",
        error: error,
        success: false,
      };
    }
  };
  //comment
  const searchVideosFromDb = async (searchedText) => {
    if (searchedText !== "") {
      try {
        setLoader(true);
        const videos = await axios.get(`/search/${searchedText}`);
        setLoader(false);
        setIsShowErrorMsg(false);
        setChange(!change);
        return videos;
      } catch (error) {
        setIsShowErrorMsg(true);
        return error;
      }
    } else {
      return "Please enter search text";
    }
  };

  const getUser = async (userId) => {
    if (userId !== null) {
      try {
        const user = await axios.get(`/user/${userId}`);
        setUserFromDb(user);
        setIsShowErrorMsg(false);
        return user;
      } catch (error) {
        setIsShowErrorMsg(true);
        console.log(error);
        return error;
      }
    } else {
      return { message: "Please login first" };
    }
  };

  useEffect(() => {
    getUser(userId);
  }, []);
  //like a video
  const likeVideos = async (videoId) => {
    try {
      const likedVideo = await axios.put(`/video/like/${videoId}/${userId}`);
      setIsShowErrorMsg(false);
      setChange(!change);
      return likedVideo;
    } catch (error) {
      setIsShowErrorMsg(true);
      console.log(error);
      return error;
    }
  };

  //add to watch later
  const addToWatchLaterVideo = async (videoId) => {
    try {
      const addedToWatchLaterVideo = await axios.put(
        `/video/watchLater/${videoId}/${userId}`
      );
      setIsShowErrorMsg(false);
      setChange(!change);
      return addedToWatchLaterVideo;
    } catch (error) {
      setIsShowErrorMsg(true);
      console.log(error);
      return error;
    }
  };

  //make new playlist

  const makeNewPlaylist = async (playlistName) => {
    try {
      const response = await axios.put(
        `/video/newPlayList/${playlistName}/${userId}`
      );
      setIsShowErrorMsg(false);
      setChange(!change);
      return response;
    } catch (error) {
      setIsShowErrorMsg(true);
      console.log(error);
      return error;
    }
  };

  //add to playlist
  const addVideoToPlaylist = async (playListName, videoId) => {
    try {
      const addedToPlaylistVideo = await axios.put(
        `/video/playlist/${playListName}/${videoId}/${userId}`
      );
      setIsShowErrorMsg(false);
      setChange(!change);
      return addedToPlaylistVideo;
    } catch (error) {
      setIsShowErrorMsg(true);
      console.log(error);
      return error;
    }
  };

  //history
  const addToHistory = async (videoId) => {
    try {
      const watchedVideo = await axios.put(
        `/video/history/${videoId}/${userId}`
      );
      setIsShowErrorMsg(false);
      setChange(!change);
      return watchedVideo;
    } catch (error) {
      setIsShowErrorMsg(true);
      console.log(error);
      return error;
    }
  };

  return (
    <videoContext.Provider
      value={{
        signUp,
        signIn,
        getVideos,
        fetchedVids,
        likeVideos,
        userName,
        userId,
        makeNewPlaylist,
        addVideoToPlaylist,
        addToWatchLaterVideo,
        addToHistory,
        jwttoken,
        getUser,
        userFromDb,
        isShowErrorMsg,
        setIsShowErrorMsg,
        change,
        setChange,
        searchedVideos,
        setSearchedVideos,
        searchVideosFromDb,
        loader,
      }}
    >
      {props.children}
    </videoContext.Provider>
  );
};

//todo:

// write cleaner code
//try to generalise more
// add toastify wherever necessary
// ofc more styling
// think about the subscribe btn
// // make changes in the model
// think about comments, views
// add loaders wherever req
// option to upload your own video!
