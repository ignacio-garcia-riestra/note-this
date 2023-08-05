import { Sequelize } from "sequelize-typescript";
import { Note } from "../models/note.model";

export const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "",
  database: "note_this_db",
  logging: false,
  models: [
    Note
  ],
});

async function connectionDB() {
  try {
    await connection.sync();
  } catch (error) {
    console.log(error);
  }
}

export default connectionDB;