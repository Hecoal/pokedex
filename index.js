const express = require('express');
const app = express();
//Import data base, save it on an array
const { pokemon }=require('./pokedex.json');

//Verbs HTTP (to make petitions): GET, POST (save data), PATCH (update a single data), PUT (update all the data), DELETE (delete)
app.get('/', (req,res,next)=>{
    
    return res.status(200).send('Welcome to Pokedex');
    //Alternative res.status(200)
    //            res.send('Welcome to pokedex')
});

//Return all the data when you type the following URL:
app.get('/:pokemon', (req,res,next)=>{
    return res.status(200).send(pokemon);
});

//We import the pokemon with the same id as the URL. Making sure it only accepts numbers with REGEX
app.get('/pokemon/:id([0-9]{1,3})',(req,res,next)=>{
    //We set the limits to search a pokemon from the json
    const id=req.params.id-1;
    if(id>=0 && id<=151){
        return res.status(200).send(pokemon[req.params.id -1]);
    }else{
        return res.status(404).send('Pokemon not found');
    }
    
});

//Route to find pokemon by their names. Making sure it only accpets letters with REGEX
app.get('/pokemon/:name([A-Za-z]+)',(req,res,next)=>{
    const name = req.params.name;

    //We filter the entire array
    const pk = pokemon.filter((p)=>{

        //We look for the URL name and the JSON

        return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;

        // if(p.name.toUpperCase() == name.toUpperCase()){
        //     return p;
        // }
    });
    //(condition ? valor if its true : value if its false)
    (pk.length>0) ? res.status(200).send(pk): res.status(404).send('Pokemon not found');
    
    /*This is the same as doing....

        //We get the name from url
        const name= req.params.name;
        for(i=0;i<pokemon.length;i++){
            //Pokemon in the i position, lets get the name
            if(pokemon[i].name.toLocaleUpperCase()==name.toLocaleUpperCase()){
                return res.status(200).send(pokemon[i]);
            }
        }
        return res.status(404).send('Pokemon not found')*/


});

//This function doesnt have a name, and opens a port. Is the same as function(){}
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running...');
});