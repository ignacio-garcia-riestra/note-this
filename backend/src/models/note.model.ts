import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "notes",
})
export class Note extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [2, 26],
    },
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [2, 250],
    },
  })
  content!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  is_active!: boolean;
}
