
import jwt from "jsonwebtoken";
import { getIdUserService } from "../services/userService.js";
export const authMiddleware = async(req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const sliceToken = token.slice(7);
      const decoded = jwt.verify(sliceToken, process.env.secret_key);
      req.user = await getIdUserService(decoded.userId)
      if (!req.user) {
        return res.status(404).json("User not found");
      }
      next();
    } catch (error) {
      return res.status(400).json("no authorized token failed");
    }
  } else {
    return res.status(400).json("no token");
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.roleId === 3 || req.user && req.user.roleId === 1) {
    next();
  } else {
    return res.status(401).json("not authorized as an admin or supplier");
  }
};

export const authorizeCustomer = (req, res, next) => {
  if (req.user && req.user.roleId === 2) {
    next();
  } else {
    return res.status(401).json("not authorized as an customer");
  }
};