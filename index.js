//Morgan is usefull to know whats going on with the server and what data is moving
const morgan = require('morgan');
const express = require('express');
const app = express();

//Routes
const pokemon = require('./Routes/pokemon.js');
const user = require('./Routes/user.js');

//Middlewares
const auth = require('./Middleware/auth.js')
const notFound=require('./Middleware/notFound.js');
const index = require('./Middleware/index.js');
const cors = require('./Middleware/cors.js');

app.use(cors);
app.use(morgan('dev'));

//Necesary to show the data as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Verbs HTTP (to make petitions): GET, POST (save data), PATCH (update a single data), PUT (update all the data), DELETE (delete)
app.get('/',index );

//Every route with /pokemon, will do this:
app.use('/user', user);
app.use(auth);
app.use('/pokemon',pokemon);


//For invalid URLS
app.use(notFound);

//This function doesnt have a name, and opens a port. Is the same as function(){}
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running...');
});