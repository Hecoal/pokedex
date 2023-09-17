const express = require('express');
const pokemon = express.Router();
//Import data base, save it on an array
const db = require('../Config/database');

pokemon.post("/", (req,res,next)=>{
    //We receive the data from the post and we show it as JSON
    return res.status(200).send(req.body.name);
});

//Waits for the query
pokemon.get('/', async(req,res,next)=>{
    const pkmn= await db.query('SELECT * FROM pokemon');
    return res.status(200).json(pkmn);
});

//We import the pokemon with the same id as the URL. Making sure it only accepts numbers with REGEX
pokemon.get('/:id([0-9]{1,3})',(req,res,next)=>{
    //We set the limits to search a pokemon from the json
    const id=req.params.id-1;
    if(id>=0 && id<=150){
        return res.status(200).send(pk[req.params.id -1]);
    }else{
        return res.status(404).send('Pokemon not found');
    }
    
});

//Route to find pokemon by their names. Making sure it only accpets letters with REGEX
pokemon.get('/:name([A-Za-z]+)',(req,res,next)=>{
    const name = req.params.name;

    //We filter the entire array
    const pkmn = pk.filter((p)=>{

        //We look for the URL name and the JSON

        return (p.name.toUpperCase() == name.toUpperCase()) && p;

        // if(p.name.toUpperCase() == name.toUpperCase()){
        //     return p;
        // }
    });
    //(condition ? valor if its true : value if its false)
    (pkmn.length>0) ? res.status(200).send(pkmn): res.status(404).send('Pokemon not found');
    
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

module.exports=pokemon;