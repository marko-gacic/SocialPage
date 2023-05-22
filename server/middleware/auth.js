import jwr from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.headers("Authorization");
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
