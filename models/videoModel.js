import mongoose from "mongoose";

import videos from "../data.js";
const { Schema } = mongoose;

const VideoSchema = new Schema({
  _id: String,
  name: String,
  creator: String,
  date: String,
  uploader: String,
  category: Array,
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
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

// {
//     "_id":"QtXby3twMmI",
//     "name":"Coldplay - Adventure Of A Lifetime (Official Video)",
//     "creator":"Coldplay",
//     "date":"Nov 29, 2015",
//     "catergory":["coldplay","music"]
// }
