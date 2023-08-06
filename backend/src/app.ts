import cors from "cors";
import express, { json, urlencoded } from "express"
import morgan from "morgan";
import connectionDB from "./connection/connection";
import NoteRoutes from "./routes/note.routes";
import UserRoutes from "./routes/user.routes";

const app = express ();
app.set("port", process.env.PORT || 5000);
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

connectionDB();

app.get("/api", (req, res) => {res.json("testing api root route")})

app.use("/api/notes", NoteRoutes)
app.use("/api/users", UserRoutes)

export default app;