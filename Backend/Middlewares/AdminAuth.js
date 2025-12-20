import jwt from "jsonwebtoken";

const AdminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded !==
      process.env.ADMIN_USERNAME + process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "You are not admin" });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default AdminAuth;
