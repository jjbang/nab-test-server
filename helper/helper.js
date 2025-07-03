module.exports = {
  verifyToken: (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

      if (token == null || token !== process.env.API_TOKEN)
        return res.status(401).json({ message: "Invalid token" }); // No token present

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" }); // No token present
    }
  },
};
