const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

const getAllAuthors = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('authors').find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving authors', error: error.message });
  }
};

const getSingleAuthor = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID' });
    }

    const result = await db.collection('authors').findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving author', error: error.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('authors').insertOne(req.body);
    res.status(201).json({ message: 'Author created', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating author', error: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID' });
    }

    const result = await db.collection('authors').replaceOne(
      { _id: new ObjectId(id) },
      req.body
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating author', error: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID' });
    }

    const result = await db.collection('authors').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting author', error: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};