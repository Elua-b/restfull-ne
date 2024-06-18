const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require("joi");

const book = sequelize.define("book", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  publicYear: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
// create table if not exists
(async () => {
  try {
    await book.sync();
    console.log("book table created successfully");
  } catch (err) {
    console.error("Error syncing book table:", err);
  }
})();
module.exports.book = book;
// Validate book details
const validateBook = (book) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().required(),
    author: Joi.string().required(),
    publisher: Joi.string().required(),
    publicYear: Joi.string().required(),
    subject: Joi.string().required(),
  });
  return schema.validate(book);
};
module.exports.validateBook = validateBook;
