import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Invalid Token!" });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, error: "Internal server error" });
  }
};

export default verifyUser;
