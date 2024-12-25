import express from 'express';
import { PORT , mongoDBURL} from './config.js'
import mongoose from 'mongoose';
import { bookRouter } from './Routes/bookRouter.js';
const app = express();

app.get('/', (request, response) => {
console.log(request);
return response.status(234).send('Welcome');
});


// Route for save a new book
app.post('/books', async (request, response) => {
    try{
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
                
                return response,status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: 'Error in Saving Book'});
    }
})

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App Connected to database');
    app.listen(PORT, () => {
     console.log('App is listening to port: ${PORT}');

});
})
.catch((error) => {
    console.log(error);
});