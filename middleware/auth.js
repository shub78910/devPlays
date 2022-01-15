import jwt from "jsonwebtoken";

let auth = (req, res, next) => {
  let secret = "secret";

  const token = req.header("authToken");
  let updatedToken = token.replace(/['"]+/g, "");

  if (!updatedToken) return res.status(401).json({ message: "Access denied." });

  try {
    const verified = jwt.verify(updatedToken, secret);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid token" });
  }
};
export default auth;
