import "dotenv/config";
import jwt from "jsonwebtoken";
import CustomError from "../utils/custom-error.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.get("Authorization").split(" ")[1];
    if (!token) throw new CustomError("No autorizado", 401);
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};