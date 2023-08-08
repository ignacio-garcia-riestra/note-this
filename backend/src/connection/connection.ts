import { Sequelize } from "sequelize-typescript";
import { Note } from "../models/note.model";
import { User } from "../models/user.model";
import default_user from "./default_user.json";
import fake_default_user_notes from "./fake_default_user_notes.json";
import bcrypt from "bcrypt";

export const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "",
  database: "note_this_db",
  logging: false,
  models: [User, Note],
});

User.hasMany(Note, {
  foreignKey: "user_id",
  sourceKey: "id",
});

async function connectionDB() {
  try {
    await connection.sync({ force: true });

    const { firstname, lastname, email, password } = default_user;
    bcrypt.hash(password, 12).then((hash) => {
      User.create({
        firstname,
        lastname,
        email,
        password: hash,
      }).then(() => Note.bulkCreate(fake_default_user_notes));
    });
  } catch (error) {
    console.log(error);
  }
}

export default connectionDB;
