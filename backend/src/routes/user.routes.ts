import { Router } from "express";
import { authUser, newUser } from "../controllers/user.controller";

const UserRoutes = Router();

UserRoutes.post("/register", newUser);
UserRoutes.post("/auth", authUser);

export default UserRoutes