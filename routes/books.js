const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validateBook = require('../middleware/validateBook');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);
router.post('/',  isAuthenticated, validateBook, booksController.createBook);
router.put('/:id',  isAuthenticated, validateBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;