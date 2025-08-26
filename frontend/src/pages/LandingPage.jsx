import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaUserEdit, FaChartLine } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Manage Your Books Collection with Ease
              </h1>
              <p className="text-blue-100 text-lg md:text-xl mb-8">
                A simple, powerful application to organize, track and manage your books library in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/books" 
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-lg px-6 py-3 text-center transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Books
                </Link>
                <Link 
                  to="/books/create" 
                  className="bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg px-6 py-3 text-center transition duration-300 shadow-lg hover:shadow-xl border border-blue-700"
                >
                  Add New Book
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Book stack illustration */}
                <div className="w-64 h-64 md:w-80 md:h-80 relative">
                  <div className="absolute bottom-0 right-0 w-48 h-64 bg-blue-500 rounded-lg shadow-xl transform rotate-6"></div>
                  <div className="absolute bottom-0 right-4 w-48 h-64 bg-indigo-500 rounded-lg shadow-xl transform rotate-3"></div>
                  <div className="absolute bottom-0 right-8 w-48 h-64 bg-blue-700 rounded-lg shadow-xl"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl">
                    <FaBook />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Powerful Features for Book Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <FaBook />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Organize Collection</h3>
              <p className="text-gray-600">
                Keep track of all your books in one place with detailed information about each title.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <FaUserEdit />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Management</h3>
              <p className="text-gray-600">
                Add, edit, and remove books with a simple and intuitive interface. No technical skills required.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Statistics</h3>
              <p className="text-gray-600">
                See publishing years, authors, and other statistics about your book collection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Library books" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About BookStore MERN
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                BookStore MERN is a full-stack web application built with MongoDB, Express, React, and Node.js. 
                It provides a simple and effective way to manage your book collection digitally.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Whether you're a book enthusiast, a library manager, or just someone who wants to keep track of their reading list, 
                BookStore MERN offers the tools you need to stay organized.
              </p>
              <Link 
                to="/books" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to organize your books?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start managing your book collection today with our easy-to-use platform.
          </p>
          <Link 
            to="/books" 
            className="bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-lg px-8 py-3 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="text-2xl font-bold flex items-center">
                <FaBook className="mr-2" />
                <span>BookStore MERN</span>
              </Link>
              <p className="text-gray-400 mt-2">Organize your books collection with ease</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">
              <Link to="/books" className="hover:text-blue-400 transition">Books</Link>
              <Link to="/books/create" className="hover:text-blue-400 transition">Add Book</Link>
              <a href="#" className="hover:text-blue-400 transition">About</a>
              <a href="#" className="hover:text-blue-400 transition">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BookStore MERN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
