import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: 1,
  },
  pswd: {
    type: String,
    minlength: 5,
  },
  likedVideos: {
    type: Array,
    default: [],
  },
  watchlist: {
    type: Array,
    default: [],
  },
  playlist: {
    type: Object,
    default: {},
  },
  history: {
    type: Array,
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);
