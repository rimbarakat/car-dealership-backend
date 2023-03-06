const authMiddleware = (req, res, next) => {
  const token = req.headers["Authorization"];
  if (!isValid(token)) {
    return res.status(401).send({});
  }
  next();
};
module.exports = authMiddleware;
