
const bookRouter = require('express').Router();

const {createBook,getBook,getBooks,deleteBook,updateBook } = require('../controllers/book.controller');
const { auth } = require('../middleware/auth.middleware');

bookRouter.post('/create', auth, createBook);
bookRouter.get('/books', auth, getBooks);
bookRouter.get('/:id', auth, getBook);
bookRouter.put('/update/:id', auth, updateBook);
bookRouter.delete('/delete/:id', auth, deleteBook);

module.exports = bookRouter;
