const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validateBook = require('../middleware/validateBook');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);
router.post('/', validateBook, booksController.createBook);
router.put('/:id', validateBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;