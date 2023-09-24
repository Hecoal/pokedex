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
    return res.status(200).json({code:1,message:pkmn})
});

//We import the pokemon with the same id as the URL. Making sure it only accepts numbers with REGEX
pokemon.get('/:id([0-9]{1,3})',async(req,res,next)=>{
    const id = req.params.id;
    if(id>=1 && id<=722){
        const pkmn= await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json({code:1,message:pkmn});
    }
    return res.status(404).send({code:404, message:'Pokemon not found'});
});

//Route to find pokemon by their names. Making sure it only accpets letters with REGEX
pokemon.get('/:name([A-Za-z]+)',async(req,res,next)=>{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+ name+"';");
    if(pkmn.length>0){
        return res.status(200).json({code:1,message:pkmn});
    }
    return res.status(404).send({code:404, message:'Pokemon not found'});

});

module.exports=pokemon;