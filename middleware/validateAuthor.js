const validateAuthor = (req, res, next) => {
  const { firstName, lastName, birthYear, country, awards } = req.body;

  if (!firstName || !lastName || birthYear === undefined || !country || !awards) {
    return res.status(400).json({ message: 'All author fields are required.' });
  }

  next();
};

module.exports = validateAuthor;