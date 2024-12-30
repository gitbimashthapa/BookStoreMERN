import express from 'express';
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose';
import { bookRouter } from './Routes/bookRouter.js';
const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
});


// Route for save a new book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await Book.create(newBook);

        return response.status(200).json({
            Count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Error in Saving Book' });
    }
})


// Route for get all books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find();

        return response.status(200).json({
            Count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Error' });
    }
});

// Route for get all books from database by id
app.get('/books/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);

        const books = await Book.find();

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Error' });
    }
});


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App Connected to database');
        app.listen(PORT, () => {
            console.log('App is listening to port: ${PORT}');

        });
    })
    .catch((error) => {
        console.log(error);
    });