import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/home/BackButton';
import Spinner from '../components/home/Spinner';
import Header from '../components/Header';
import axios from 'axios';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-6">Book Details</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
              <p className="text-blue-100 text-lg">By {book.author}</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Book Information</h3>
                    
                    <div className="space-y-3">
                      <div className="flex border-b border-gray-200 pb-3">
                        <span className="font-medium text-gray-600 w-1/3">ID:</span>
                        <span className="text-gray-800">{book._id}</span>
                      </div>
                      
                      <div className="flex border-b border-gray-200 pb-3">
                        <span className="font-medium text-gray-600 w-1/3">Title:</span>
                        <span className="text-gray-800">{book.title}</span>
                      </div>
                      
                      <div className="flex border-b border-gray-200 pb-3">
                        <span className="font-medium text-gray-600 w-1/3">Author:</span>
                        <span className="text-gray-800">{book.author}</span>
                      </div>
                      
                      <div className="flex border-b border-gray-200 pb-3">
                        <span className="font-medium text-gray-600 w-1/3">Publish Year:</span>
                        <span className="text-gray-800">
                          <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm">
                            {book.publishYear}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 px-4 mb-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Timestamps</h3>
                    
                    <div className="space-y-3">
                      <div className="flex border-b border-gray-200 pb-3">
                        <span className="font-medium text-gray-600 w-1/3">Created:</span>
                        <span className="text-gray-800">{new Date(book.createdAt).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex border-b border-gray-200 pb-3">
                        <span className="font-medium text-gray-600 w-1/3">Last Update:</span>
                        <span className="text-gray-800">{new Date(book.updatedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <BackButton destination="/" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
