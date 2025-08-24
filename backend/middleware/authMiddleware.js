export const verifyAdmin = (req, res, next) => {
  const user = req.user; // assuming user is set after JWT verification
  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
