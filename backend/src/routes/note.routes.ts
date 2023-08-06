import { Router } from "express";
import { deleteNote, editNote, listNotes, newNote, toggleNoteStatus } from "../controllers/note.controller";

const NoteRoutes = Router();

NoteRoutes.get("/all/:userId", listNotes);
NoteRoutes.post("/new/:userId", newNote);
NoteRoutes.delete("/delete/:id", deleteNote);
NoteRoutes.put("/edit/:id", editNote);
NoteRoutes.put("/toggle-note-status/:id", toggleNoteStatus);

export default NoteRoutes