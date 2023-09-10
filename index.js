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

//We import the pokemon with the same id as the URL. Making sure it only accepts numbers with REGEX
app.get('/pokemon/:id([0-9]{1,3})',(req,res,next)=>{
    //We set the limits to search a pokemon from the json
    const id=req.params.id-1;
    if(id>=0 && id<=151){
        res.status(200);
        res.send(pokemon[req.params.id -1]);
    }else{
        res.status(404);
        res.send('Pokemon not found');
    }
    
});
app.get('/:pokemon/all', (req,res,next)=>{
    res.status(200);
    res.send(pokemon);
});

//Route to find pokemon by their names
app.get('/pokemon/:name',(req,res,next)=>{
    //We get the name from url
    const name= req.params.name;
    for(i=0;i<pokemon.length;i++){
        //Pokemon in the i position, lets get the name
        if(pokemon[i].name==name){
            res.status(200);
            res.send(pokemon[i]);
        }
    }
    res.status(404);
    res.send('Pokemon not found');
});
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running...');
});