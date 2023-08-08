import { RequestHandler } from "express";
import { sign, verify } from "jsonwebtoken";
import { User } from "../models/user.model";

export const createToken = (user: User | null) => {
  const accessToken = sign(
    {
      email: user?.email,
      firstname: user?.firstname,
      id: user?.id,
    },
    "devModeWeakSecret",
    {
      expiresIn: 60 * 60 * 24 * 30 * 1000,
    }
  );
  return accessToken;
};

export const validateToken: RequestHandler = (req, res, next) => {
  
  const accessToken = req.headers.token?.toString();
  
  if (!accessToken)
    return res.status(400).json({ error: "User not authenticated" });

  try {
    const validToken = verify(accessToken, "devModeWeakSecret");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
