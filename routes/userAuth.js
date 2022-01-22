import express from "express";
const router = express.Router();
import { User } from "../models/userSchema.js";
import auth from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// router.get("/", (req, res) => {
//   res.send("you are on localhost");
// });

let secret = "secret";

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(200).json({
      success: false,
      message: "Sorry a user with this email already exists",
    });
  }

  //hashing password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.pswd, salt);

  user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    pswd: hashedPassword,
  });

  const savedUser = await user.save();
  return res
    .status(200)
    .json({ message: "Succesfully registered", success: true });
});

router.post("/login", async (req, res) => {
  let { email, pswd } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(200).json({
      loginSuccess: false,
      message: "Email does not exist. Please register.",
    });
  }

  const validPass = await bcrypt.compare(pswd, user.pswd);

  if (!validPass) {
    return res.status(200).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "1d" });
    return res
      .header("authtoken", token)
      .status(201)
      .json({ token: token, message: "Succesfully logged in", user });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
