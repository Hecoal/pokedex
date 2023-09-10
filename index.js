const express = require('express');
const app = express();
//Import data base
const { pokemon }=require('./pokedex.json');

//This function doesnt have a name, and opens a port. Is the same as function(){}
//Verbs HTTP (to make petitions): GET, POST (save data), PATCH (update a single data), PUT (update all the data), DELETE (delete)
app.get('/', (req,res,next)=>{
    res.status(200); //everything is fine
    res.send('Welcome to Pokedex');
});
app.get('/:pokemon', (req,res,next)=>{
    res.status(200);
    res.send(pokemon);
});

app.get('/pokemon/:id',(req,res,next)=>{
    res.status(200);
    res.send(pokemon);
});
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running...');
});