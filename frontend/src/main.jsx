import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/pages/App.jsx';
import './components/pages/index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
);
