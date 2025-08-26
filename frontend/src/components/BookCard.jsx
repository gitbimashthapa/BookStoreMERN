import React from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="p-5 border-b flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
          <p className="text-gray-600">By: {book.author}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm">
          {book.publishYear}
        </div>
      </div>
      
      <div className="p-5 bg-gray-50">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Added: {new Date(book.createdAt).toLocaleDateString()}
          </p>
          <div className="flex space-x-2">
            <Link to={`/books/details/${book._id}`} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition">
              <BsInfoCircle />
            </Link>
            <Link to={`/books/edit/${book._id}`} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition">
              <AiOutlineEdit />
            </Link>
            <Link to={`/books/delete/${book._id}`} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition">
              <MdOutlineDelete />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
