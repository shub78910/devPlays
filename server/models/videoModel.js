import mongoose from "mongoose";

import videos from "../data.js";
const { Schema } = mongoose;

const VideoSchema = new Schema({
  _id: String,
  thumbnail: String,
  name: String,
  creator: String,
  date: String,
  category: Array,
  likes: {
    type: Number,
    default: 0,
  },
});

export const Video = mongoose.model("Video", VideoSchema);

const addVideosToDB = () => {
  videos.forEach(async (video) => {
    const NewVideo = new Video(video);
    const savedVideo = await NewVideo.save();
    console.log(savedVideo);
  });
};

export default addVideosToDB;
