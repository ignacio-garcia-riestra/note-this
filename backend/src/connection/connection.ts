import { Sequelize } from "sequelize-typescript";
import { Note } from "../models/note.model";
import { User } from "../models/user.model";

export const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "",
  database: "note_this_db",
  logging: false,
  models: [
    User,
    Note
  ],
});

User.hasMany(Note, {
  foreignKey: "user_id",
  sourceKey: "id"
})

async function connectionDB() {
  try {
    await connection.sync({force: true});
  } catch (error) {
    console.log(error);
  }
}

export default connectionDB;