const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const validateAuthor = require('../middleware/validateAuthor');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getSingleAuthor);
router.post('/',  isAuthenticated, validateAuthor, authorsController.createAuthor);
router.put('/:id',  isAuthenticated, validateAuthor, authorsController.updateAuthor);
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;