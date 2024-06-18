const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = sequelize.define("user-table", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
 ,
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role:{
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'USER'
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
});


(async () => {
  try {
    await User.sync();
    console.log("User table created successfully");
  } catch (err) {
    console.error("Error syncing User table:", err);
  }
})();

User.prototype.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);
  return token;
};

module.exports = User;

module.exports.validateUser = (body, isUpdating = false) => {
  return Joi.object({
    
   
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: isUpdating ? Joi.string().min(6) : Joi.string().min(6).required(),
   
  }).validate(body);
};
module.exports.validateUpdateUser = (body, isUpdating = false) => {
  return Joi.object({
   
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: isUpdating ? Joi.string().min(6) : Joi.string().min(6).required(),
  }).validate(body);
};
module.exports.validateUserLogin = (body) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(body);
};


module.exports.PhoneRegex = /(?<!\d)\d{10}(?!\d)/;
