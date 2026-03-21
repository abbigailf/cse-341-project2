const validateBook = (req, res, next) => {
  const { title, author, genre, publishedYear, pages, rating, inStock } = req.body;

  if (
    !title ||
    !author ||
    !genre ||
    publishedYear === undefined ||
    pages === undefined ||
    rating === undefined ||
    inStock === undefined
  ) {
    return res.status(400).json({ message: 'All book fields are required.' });
  }

  next();
};

module.exports = validateBook;