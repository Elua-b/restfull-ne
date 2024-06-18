const { Op } = require("sequelize");
const { book, validateBook } = require("../models/book.model");
const User = require("../models/user.model");

const createBook = async (req, res) => {
  try {
    const { error } = validateBook(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { name, author, publisher, publicYear, subject } = req.body;
    const createdBy = req.user.id;
    console.log(createdBy);

    const user = await book.create({ ...req.body, createdBy });

    return res.status(201).send({ message: "OK", user });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

const getBooks = async (req, res) => {
  try {
    const Books = await book.findAll({
      where: { createdBy: req.user.id },
    });

    return res.status(200).send({ message: "OK", Books });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

const getBook = async (req, res) => {
  try {
    const Book = await book.findByPk(req.params.id);
    if (!Book)
      return res.status(404).send({ message: "Book not found" });

    return res.status(200).send({ message: "OK", Book });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

const updateBook = async (req, res) => {
  try {
    const { error } = validateBook(req.body, true);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { name, author, publisher, publicYear, subject } = req.body;
    const createdBy = req.user.id;
  
    const Book = await book.findByPk(req.params.id);
    if (!Book)
      return res.status(404).send({ message: "Book not found" });

    await book.update(
      { ...req.body, createdBy },
      {
        where: {
          id: req.params.id,
        },
      }
    );


    return res.status(200).send({ message: "OK", book: Book });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

const deleteBook = async (req, res) => {
  try {
    const Book = await book.findByPk(req.params.id);
    if (!Book)
      return res.status(404).send({ message: "Book not found" });

    await book.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).send({ message: "OK", Book });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

module.exports = {
 
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,

};
