import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>BookStore MERN</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`hover:text-blue-200 transition ${location.pathname === '/' ? 'font-semibold border-b-2 border-white' : ''}`}>
              Home
            </Link>
            <Link to="/books" className={`hover:text-blue-200 transition ${location.pathname === '/books' ? 'font-semibold border-b-2 border-white' : ''}`}>
              Books
            </Link>
            <Link to="/books/create" className={`hover:text-blue-200 transition ${location.pathname === '/books/create' ? 'font-semibold border-b-2 border-white' : ''}`}>
              Add Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
