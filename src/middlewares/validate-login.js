export const validateLogin = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn) return next();
  return res.status(401).json({ msg: "No estas logueado" });
};