//Morgan is usefull to know whats going on with the server and what data is moving
const morgan = require('morgan');
const express = require('express');
const app = express();
//Import pokemon
const pokemon = require('./Routes/pokemon.js');

app.use(morgan('dev'));

//Necesary to show the data as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Verbs HTTP (to make petitions): GET, POST (save data), PATCH (update a single data), PUT (update all the data), DELETE (delete)
app.get('/', (req,res,next)=>{
    
    return res.status(200).send('Welcome to Pokedex');
    //Alternative res.status(200)
    //            res.send('Welcome to pokedex')
});

//Eevery route with /pokemon, will do this:
app.use('/pokemon',pokemon);

//This function doesnt have a name, and opens a port. Is the same as function(){}
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running...');
});