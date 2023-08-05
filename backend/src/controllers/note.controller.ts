import { RequestHandler } from "express";
import { Note } from "../models/note.model";

export const listNotes: RequestHandler = async (req, res) => {
  try {
    const notes: Array<Note> = await Note.findAll();
    return res.json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "Error in listing all the notes",
      error: error,
    });
  }
};

export const newNote: RequestHandler = async (req, res) => {
    try {
      await Note.create({ ...req.body })
      return res.status(201).json({
        message: "New note created"
      })
    } catch (error) {
      return res.status(500).json({
        message: "Error creating a new note",
        error: error,
      });
    }
  };

  export const deleteNote: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      await Note.destroy({ where: { id } })
      return res.status(200).json({
        message: "Note deleted"
      })
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting the note",
        error: error,
      });
    }
  };

  export const editNote: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      await Note.update({
        title: req.body.title,
        content: req.body.content
        }, { where: { id } })
      return res.status(200).json({
        message: "Note edited"
      })
    } catch (error) {
      return res.status(500).json({
        message: "Error editing the note",
        error: error,
      });
    }
  };

  export const toggleNoteStatus: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      await Note.update({
        is_active: !req.body.is_active
        }, { where: { id } })
      return res.status(200).json({
        message: `Note ${req.body.is_active ? "archived" : "actived"}`
      })
    } catch (error) {
      return res.status(500).json({
        message: "Error toggling the note status",
        error: error,
      });
    }
  };