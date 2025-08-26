import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/home/Spinner';
import { MdOutlineAddBox } from 'react-icons/md';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import api from '../services/api';
import { useSnackbar } from 'notistack';
import { useAuth } from '../context/AuthContext';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const response = await api.get('/books/mybooks');
      setBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching my books:', error);
      setLoading(false);
      enqueueSnackbar('Failed to fetch your books', { variant: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Books</h1>
          <Link to="/books/create" className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            <MdOutlineAddBox className="mr-2 text-xl" />
            Add Book
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : books.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">You haven't added any books yet</h2>
            <p className="text-gray-600 mb-6">Create your first book by clicking the "Add Book" button above</p>
            <Link to="/books/create" className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              <MdOutlineAddBox className="mr-2 text-xl" />
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
