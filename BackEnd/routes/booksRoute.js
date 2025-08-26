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
    
    // Add the user ID to the book data
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      user: request.user._id, // Link book to the authenticated user
      description: request.body.description || '',
      coverImage: request.body.coverImage || '',
    };

    const book = await Book.create(newBook);

    // Record user history
    await UserHistory.create({
      userId: request.user._id,
      action: 'CREATE',
      bookId: book._id,
      details: `Created book: ${book.title}`,
    });

    return response.status(201).send(book);
  } catch (error) {
    console.error('Error creating book:', error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get books by current user
router.get('/mybooks', protect, async (request, response) => {
  try {
    // Find books for current user and populate user information
    const books = await Book.find({ user: request.user._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 }); // Sort by newest first

    // Record user history
    await UserHistory.create({
      userId: request.user._id,
      action: 'READ',
      details: 'Viewed my books',
    });

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching user books:', error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', protect, async (request, response) => {
  try {
    // Get query parameters for filtering
    const { userId } = request.query;
    
    // Build the filter object
    const filter = {};
    
    // If userId is provided, filter books by that user
    if (userId) {
      filter.user = userId;
    }
    
    // Find books with optional filter and populate user information
    const books = await Book.find(filter)
      .populate('user', 'name email') // Include user details
      .sort({ createdAt: -1 }); // Sort by newest first

    // Record user history
    await UserHistory.create({
      userId: request.user._id,
      action: 'READ',
      details: 'Viewed all books',
    });

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', protect, async (request, response) => {
  try {
    const { id } = request.params;

    // Find the book and populate user information
    const book = await Book.findById(id).populate('user', 'name email');

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    // Record user history
    await UserHistory.create({
      userId: request.user._id,
      action: 'READ',
      bookId: book._id,
      details: `Viewed book: ${book.title}`,
    });

    return response.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error.message);
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

    // Find the book
    const book = await Book.findById(id);
    
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    // Check if the user is the owner of the book or an admin
    if (book.user.toString() !== request.user._id.toString() && request.user.role !== 'admin') {
      return response.status(403).json({ message: 'Not authorized to update this book' });
    }

    // Update the book
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        ...request.body,
        user: request.user._id, // Ensure user ID is preserved
      },
      { new: true }
    );

    // Record user history
    await UserHistory.create({
      userId: request.user._id,
      action: 'UPDATE',
      bookId: book._id,
      details: `Updated book: ${book.title}`,
    });

    return response.status(200).json({
      message: 'Book updated successfully',
      book: updatedBook
    });
  } catch (error) {
    console.error('Error updating book:', error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', protect, async (request, response) => {
  try {
    const { id } = request.params;

    // Find the book
    const book = await Book.findById(id);
    
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    // Check if the user is the owner of the book or an admin
    if (book.user.toString() !== request.user._id.toString() && request.user.role !== 'admin') {
      return response.status(403).json({ message: 'Not authorized to delete this book' });
    }

    // Delete the book
    await Book.findByIdAndDelete(id);

    // Record user history
    await UserHistory.create({
      userId: request.user._id,
      action: 'DELETE',
      bookId: book._id,
      details: `Deleted book: ${book.title}`,
    });

    return response.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
