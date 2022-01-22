import jwt from "jsonwebtoken";

let secret = "secret";
let auth = (req, res, next) => {
  const token = req.header("authtoken");
  if (!token) return res.status(401).json({ message: "Access denied." });

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default auth;
