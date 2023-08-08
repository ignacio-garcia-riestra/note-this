import { RequestHandler } from "express";
import { User } from "../models/user.model";
import { createToken } from "../util/jwt";
import bcrypt from "bcrypt";

export const newUser: RequestHandler = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  bcrypt.hash(password, 12).then((hash) => {
    User.create({
      firstname,
      lastname,
      email,
      password: hash,
    })
      .then(() => {
        res.status(201).json("Successfully registered user");
      })
      .catch((error) => {
        if (error) {
          res.status(401).json({ error });
        }
      });
  });
};

export const authUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user){
    res.status(400).json({ error: "No user registered with this email" });
  } else {
    const hashedPassword = user?.password;
    bcrypt.compare(password, hashedPassword ?? "").then((match) => {
      if (!match) {
        res.status(400).json({
          error:
            "Incorrect password. Please verify the email and password you have entered",
        });
      } else {
        const accessToken = createToken(user);
        res.cookie("token", accessToken).json(user);
      }
    });
  }
};
