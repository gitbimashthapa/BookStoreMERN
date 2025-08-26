import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import CreateBook from '../../pages/CreateBooks';
import ShowBook from '../../pages/ShowBook';
import EditBook from '../../pages/EditBook';
import DeleteBook from '../../pages/DeleteBook';
import LandingPage from '../../pages/LandingPage';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profile from '../../pages/Profile';
import ProtectedRoute from '../../components/ProtectedRoute';

const App = () => {
    return (
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/books' element={<Home />} />
        <Route path='/books/create' element={<ProtectedRoute><CreateBook /></ProtectedRoute>} />
        <Route path='/books/details/:id' element={<ShowBook />} />
        <Route path='/books/edit/:id' element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
        <Route path='/books/delete/:id' element={<ProtectedRoute><DeleteBook /></ProtectedRoute>} />
      </Routes>
    );
  };
  
  export default App;
  