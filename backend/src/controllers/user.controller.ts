import { RequestHandler } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

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
    if (!users ||!users[0]) return res.status(401).send("email is not registered")
    const validPassword = password === users[0]?.password
    if (validPassword) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
        email,
        firstname: users[0].firstname
      }, "secret")
      const serializedToken = serialize("myToken", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/"
      })
      res.setHeader("set-cookie", serializedToken)
      return res.json("successful login")
    } else {
      res.status(401).send("invalid password")
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error on user login",
      error: error,
    });
  }
};