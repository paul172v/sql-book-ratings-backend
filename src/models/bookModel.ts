import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../util/database";

export const Book = sequelize.define("book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  image: DataTypes.STRING,
  rating: DataTypes.INTEGER,
});

export default Book;
