import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import { Video } from "../models/videoModel.js";
import { User } from "../models/userSchema.js";
import fetch from "node-fetch";

//get all videos
router.get("/home", async (req, res) => {
  try {
    const videos = await Video.find();
    if (videos) {
      return res.status(200).json({
        success: true,
        msg: "All videos fetched from db",
        videos,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "There is some problem with the server." });
  }
});

//get  videos based on id
router.get("/home/:videoId", async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findById(videoId);
    if (video) {
      return res.status(200).json({
        success: true,
        msg: "Video fetched from db",
        video,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "There is some problem with the server." });
  }
});

//get videos based on specific keywords:

router.get("/search/:searchedText", async (req, res) => {
  const { searchedText } = req.params;

  try {
    const videos = await Video.find();

    const filteredVideos = videos.filter((value) => {
      return value.name.toLowerCase().includes(searchedText.toLowerCase());
    });

    return res.status(200).json({
      success: true,
      msg: "Videos based on search input fetched from db",
      filteredVideos,
    });
  } catch (error) {
    return error;
  }
});

//validate

router.get("/video/addVideo/validateId/:videoId", async (req, res) => {
  const { videoId } = req.params;

  const url = `http://i.ytimg.com/vi/${videoId}/0.jpg`;
  const { status } = await fetch(url);
  return res.json({ status: status });
});

//add a new video to db:
router.put("/video/addNewVideo", async (req, res) => {
  const { _id, category, name, creator, date, userName } = req.body;
  console.log(_id, category, name, creator, date);

  try {
    const videos = await Video.find();
    let videoInDB = videos.find((video) => video._id === _id);

    if (videoInDB) {
      return res.status(201).json({ message: "Video already in DB" });
    } else {
      console.log("im here, ");
      videos.push({
        _id: _id,
        category: category,
        name: name,
        creator: creator,
        date: date,
        comments: [],
        likes: 0,
        uploader: userName,
      });
      console.log("[pushed]");

      videos.forEach(async (video) => {
        console.log("doing for loop");
        const NewVideo = new Video(video);
        const savedVideo = await NewVideo.save();
      });
      console.log("done");

      return res.status(200).json({
        success: true,
        msg: "Added new video",
        videos,
      });
    }
  } catch (error) {
    return error;
  }
});

//get user:

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    return res.status(200).json({
      success: true,
      msg: "User fetched from db",
      user,
    });
  } catch (error) {
    console.log(error, "here is the erorororor");
  }
});

//like a video
router.put("/video/like/:videoId/:userId", async (req, res) => {
  try {
    const { videoId, userId } = req.params;

    const likedUser = await User.findById(userId);
    const likedVideo = await Video.findById(videoId);

    const index = likedUser.likedVideos.findIndex(
      (video) => video._id === videoId
    );

    if (index === -1) {
      likedUser.likedVideos.unshift(likedVideo);

      const newLikeCount = likedVideo.likes + 1;
      await Video.findByIdAndUpdate(videoId, { likes: newLikeCount });
      const likeArrayUpdate = await User.findByIdAndUpdate(userId, likedUser, {
        new: true,
      });
      return res.status(200).json({ likeArrayUpdate, message: "video liked" });
    } else {
      const filteredArr = likedUser.likedVideos.filter(
        (vid) => vid._id !== videoId
      );
      likedUser.likedVideos = filteredArr;

      const newLikeCount = likedVideo.likes - 1;
      await Video.findByIdAndUpdate(videoId, { likes: newLikeCount });
      const likeArrayUpdate = await User.findByIdAndUpdate(userId, likedUser, {
        new: true,
      });
      return res
        .status(200)
        .json({ likeArrayUpdate, message: "video disliked" });
    }
  } catch (error) {
    return error;
  }
});

//add to watch later
router.put("/video/watchLater/:videoId/:userId", async (req, res) => {
  try {
    const { videoId, userId } = req.params;

    const addToWatchLaterUser = await User.findById(userId);
    const video = await Video.findById(videoId);

    const index = addToWatchLaterUser.watchlist.findIndex(
      (video) => video._id === videoId
    );

    if (index === -1) {
      addToWatchLaterUser.watchlist.unshift(video);
      const updatedPost = await User.findByIdAndUpdate(
        userId,
        addToWatchLaterUser
      );
      res
        .status(200)
        .json({ updatedPost, message: "Video added to watch later" });
    } else {
      const filteredArr = addToWatchLaterUser.watchlist.filter(
        (vid) => vid._id !== videoId
      );
      addToWatchLaterUser.watchlist = filteredArr;
      const updatedPost = await User.findByIdAndUpdate(
        userId,
        addToWatchLaterUser
      );
      res
        .status(200)
        .json({ updatedPost, message: "Video removed from watch later" });
    }
  } catch (error) {
    return error;
  }
});

//make a new playlist:
router.put("/video/newPlayList/:playListName/:userId", async (req, res) => {
  const { playListName, userId } = req.params;

  try {
    const newListCreator = await User.findById(userId);

    let playListNames = Object.keys(newListCreator.playlist);
    let isPlayListName = playListNames.find((item) => item === playListName);

    if (isPlayListName) {
      return res.status(200).json({ message: "Playlist already exists" });
    } else {
      Object.assign(newListCreator.playlist, { [playListName]: [] });

      const updatedPost = await User.findByIdAndUpdate(userId, newListCreator);
      return res
        .status(200)
        .json({ updatedPost, message: "New playlist added" });
    }
  } catch (error) {
    return res.json({ message: "Couldn't find user" });
  }
});

//save to playlist
router.put(
  "/video/playlist/:playListName/:videoId/:userId",
  async (req, res) => {
    const { videoId, userId, playListName } = req.params;
    try {
      const saveForLaterUser = await User.findById(userId);
      const savedVideo = await Video.findById(videoId);

      let playListNames = Object.keys(saveForLaterUser.playlist);
      let isPlayListName = playListNames.find((item) => item === playListName);

      if (isPlayListName) {
        let isVideoInPlayList = saveForLaterUser.playlist[playListName].find(
          (video) => video._id === videoId
        );

        if (isVideoInPlayList) {
          let filteredArr = saveForLaterUser.playlist[playListName].filter(
            (video) => video._id !== videoId
          );
          saveForLaterUser.playlist[playListName] = filteredArr;

          const updatedPost = await User.findByIdAndUpdate(
            userId,
            saveForLaterUser
          );
          return res.status(200).json({
            updatedPost,
            success: true,
            message: `Video removed from ${playListName}`,
          });
        } else {
          saveForLaterUser.playlist[playListName].unshift(savedVideo);

          const updatedPost = await User.findByIdAndUpdate(
            userId,
            saveForLaterUser
          );
          return res.status(200).json({
            updatedPost,
            success: true,
            message: `Video added to ${playListName}`,
          });
        }
      } else {
        return res
          .status(200)
          .json({ success: false, message: "Playlist does not exist" });
      }
    } catch (error) {
      return res.json({
        success: false,
        message: "Cannot find video or the user",
        error,
      });
    }
  }
);

//history
router.put("/video/history/:videoId/:userId", async (req, res) => {
  try {
    const { videoId, userId } = req.params;

    const user = await User.findById(userId);
    const video = await Video.findById(videoId);

    const index = user.history.findIndex((video) => video._id === videoId);

    if (index === -1) {
      user.history.unshift(video);
    } else {
      const filteredArr = user.history.filter((vid) => vid._id !== videoId);
      user.history = filteredArr;
      user.history.unshift(video);
    }
    const updatedPost = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    return error;
  }
});

//add new comment
router.put("/video/addComment/:videoId/:userId", async (req, res) => {
  try {
    const { videoId, userId } = req.params;
    const { comment } = req.body;

    const user = await User.findById(userId);
    const video = await Video.findById(videoId);

    if (!video) {
      return res.json({
        commentAdd: false,
        message: "Video does not exist.",
      });
    } else {
      video.comments.unshift({
        user: user,
        comment: comment,
        commentId: new Date().getTime(),
      });
      const updatedPost = await Video.findByIdAndUpdate(videoId, video, {
        new: true,
      });
      return res.status(200).json(updatedPost);
    }
  } catch (error) {
    return error;
  }
});

//delete a comment
router.put("/video/deleteComment/:videoId/:commentId", async (req, res) => {
  try {
    const { videoId, commentId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.json({
        commentAdd: false,
        message: "Video does not exist.",
      });
    } else {
      const filteredArr = video.comments.filter(
        (item) => Number(item.commentId) !== Number(commentId)
      );
      video.comments = filteredArr;
      const updatedPost = await Video.findByIdAndUpdate(videoId, video, {
        new: true,
      });
      return res.status(200).json(updatedPost);
    }
  } catch (error) {
    return error;
  }
});

export default router;

//you gotta find a sol where in you push the whole objects instead of the string
//that way itll be easier for you to directly map those arrays and render the videos.
//done!
