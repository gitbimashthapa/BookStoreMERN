import React, { useState, useEffect } from 'react';
import BackButton from '../components/home/BackButton';
import Spinner from '../components/home/Spinner';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting book', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-red-500 to-red-700">
              <h1 className="text-2xl font-bold text-white">Delete Book</h1>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Are you sure you want to delete this book?
                  </h2>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <p className="font-semibold text-lg">{book.title}</p>
                    <p className="text-gray-600">by {book.author}</p>
                    <p className="text-gray-500 text-sm mt-2">Published: {book.publishYear}</p>
                  </div>
                  
                  <div className="flex justify-between gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="w-1/2 py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={handleDeleteBook}
                      className="w-1/2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
