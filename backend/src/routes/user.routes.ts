import { Router } from "express";
import { newUser } from "../controllers/user.controller";

const UserRoutes = Router();

UserRoutes.post("/register", newUser);

export default UserRoutes