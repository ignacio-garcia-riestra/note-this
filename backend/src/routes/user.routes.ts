import { Router } from "express";
import { authUser, newUser } from "../controllers/user.controller";
import { validateToken } from "../util/jwt";

const UserRoutes = Router();

UserRoutes.post("/register", newUser);
UserRoutes.post("/auth", authUser);
UserRoutes.get("/profile", validateToken, (req, res) => {
  res.json("Ok to go");
});

export default UserRoutes;
