import React from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const BookCard = ({ book }) => {
  const { userInfo } = useAuth();
  
  // Check if the current user is the creator of the book
  const isOwner = userInfo && book.user && userInfo._id === book.user._id;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="p-5 border-b flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
          <p className="text-gray-600">By: {book.author}</p>
          {book.user && (
            <p className="text-gray-500 text-xs mt-1">
              Added by: {book.user.name}
            </p>
          )}
        </div>
        <div className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm">
          {book.publishYear}
        </div>
      </div>
      
      {book.description && (
        <div className="px-5 pt-3 pb-1">
          <p className="text-gray-700 text-sm line-clamp-2">{book.description}</p>
        </div>
      )}
      
      <div className="p-5 bg-gray-50">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Added: {new Date(book.createdAt).toLocaleDateString()}
          </p>
          <div className="flex space-x-2">
            <Link to={`/books/details/${book._id}`} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition">
              <BsInfoCircle />
            </Link>
            
            {/* Only show edit/delete buttons if the user is the owner or admin */}
            {(isOwner || (userInfo && userInfo.role === 'admin')) && (
              <>
                <Link to={`/books/edit/${book._id}`} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition">
                  <AiOutlineEdit />
                </Link>
                <Link to={`/books/delete/${book._id}`} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition">
                  <MdOutlineDelete />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
