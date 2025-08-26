import express from 'express';
import { Book } from '../models/bookModel.js';
import { UserHistory } from '../models/userHistoryModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', protect, async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    // Record user history
    if (request.user) {
      await UserHistory.create({
        userId: request.user._id,
        action: 'CREATE',
        bookId: book._id,
        details: `Created book: ${book.title}`,
      });
    }

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', protect, async (request, response) => {
  try {
    const books = await Book.find({});

    // Record user history if authenticated
    if (request.user) {
      await UserHistory.create({
        userId: request.user._id,
        action: 'READ',
        details: 'Viewed all books',
      });
    }

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', protect, async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    // Record user history if authenticated
    if (request.user) {
      await UserHistory.create({
        userId: request.user._id,
        action: 'READ',
        bookId: book._id,
        details: `Viewed book: ${book.title}`,
      });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', protect, async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const book = await Book.findById(id);
    
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    const result = await Book.findByIdAndUpdate(id, request.body);

    // Record user history
    if (request.user) {
      await UserHistory.create({
        userId: request.user._id,
        action: 'UPDATE',
        bookId: book._id,
        details: `Updated book: ${book.title}`,
      });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', protect, async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    await Book.findByIdAndDelete(id);

    // Record user history
    if (request.user) {
      await UserHistory.create({
        userId: request.user._id,
        action: 'DELETE',
        bookId: book._id,
        details: `Deleted book: ${book.title}`,
      });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
