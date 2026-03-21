const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

const getAllBooks = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('books').find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error: error.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const result = await db.collection('books').findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book', error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('books').insertOne(req.body);
    res.status(201).json({ message: 'Book created', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const result = await db.collection('books').replaceOne(
      { _id: new ObjectId(id) },
      req.body
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const result = await db.collection('books').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};