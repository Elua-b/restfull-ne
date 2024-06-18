const bcrypt = require("bcryptjs");
const { validateUser, validateUserLogin } = require("../models/user.model");
const User = require("../models/user.model");
const { hashPassword } = require("../utils/imports");
const { Op } = require("sequelize");

const createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // let count = await User.count();
    // if (count)
    //   return res.status(400).send({ message: "Admin is already created" });
    //verify if user already exists
    const duplicateUser = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });

    if (duplicateUser) {
      return res.status(400).send({
        message: `User  already exists`,
      });
    }

    const hashedpassword = await hashPassword(password);
    console.log(hashedpassword);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
    });

    return res.status(201).send({ message: "CREATED", data: newUser });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const result = await User.findOne({ where: { id: req.user.id } });

    return res.status(200).send({ message: "OK", data: result });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

const userLogin = async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).send({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(404).send({ message: "Invalid credentials" });

    const token = user.generateAuthToken();

    return res.status(200).send({ message: "OK", token, user });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = User.validateUpdateUser(req.body, true);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { email, firstName, lastName, password } = req.body;

    const duplicateUser = await User.findOne({
      where: {
        id: { [Op.not]: req.params.id },
        [Op.or]: [{ email }, { firstName }, { lastName }, { password }],
      },
    });

    if (duplicateUser) {
      
      const emailFound = email === duplicateUser.email;

      return res.status(400).send({
        message: `User with the same ${
          emailFound ? "email" : "first name or last name "
        } already exists`,
      });
    }

    const result = await User.update(req.body, {
      where: { id: req.user.id },
      returning: true,
    });

    return res.status(200).send({ message: "UPDATED", data: result[1][0] });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).send({ message: "User not found" });

    return res.send({ message: "DELETED", data: result });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};
module.exports = {
  createUser,
  getCurrentUser,
  userLogin,
  updateUser,
  deleteUser,
};
