export const roleAuth = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "No autenticado" });
    if (req.user.role && req.user.role.toUpperCase() !== role)
      return res
        .status(403)
        .json({ msg: "No tenes permisos para acceder a este recurso" });
    next();
  };
};