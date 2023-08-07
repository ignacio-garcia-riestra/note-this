import { RequestHandler } from "express";
import { User } from "../models/user.model";

export const newUser: RequestHandler = async (req, res) => {
  try {
    await User.create({ ...req.body });
    return res.status(201).json({
      message: "New user registered",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering a new user",
      error: error,
    });
  }
};

export const authUser: RequestHandler = async (req, res) => {
  const {email, password} = req.body
  try {
    const users = await User.findAll({where: {email}})
    const validPassword = password === users[0]?.password
    if (validPassword) {
      const user = {
        email,
        firstname: users[0].firstname,
        id: users[0].id
      }
      return res.json({ user, message: "successful login"})
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error on user login",
      error: error,
    });
  }
};