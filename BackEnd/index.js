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