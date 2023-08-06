import { RequestHandler } from "express";
import { User } from "../models/user.model";

export const newUser: RequestHandler = async (req, res) => {
    try {
      await User.create({ ...req.body })
      return res.status(201).json({
        message: "New user registered"
      })
    } catch (error) {
      return res.status(500).json({
        message: "Error registering a new user",
        error: error,
      });
    }
  };