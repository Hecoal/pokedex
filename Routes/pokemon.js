const express = require('express');
const pokemon = express.Router();
//Import data base, save it on an array
const db = require('../Config/database');

//Create a new Pokemon to my DB with user data
pokemon.post("/", async(req,res,next)=>{
    const {pok_name,pok_height,pok_weight, pok_base_experience} = req.body;

    //To check if every field is complete
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        //Insert data
        query+=` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    
        //This will let us know what has changed
        const rows= await db.query(query);
        if(rows.affectedRows==1){
            //We receive the data from the post and we show it as JSON
            return res.status(201).json({code:201, message:'Pokemon Successfuly Inserted'});
        }
        return res.status(500).json({code:500, message:'An error ocurred!'});
    }
    
    return res.status(500).json({code:500, message:'Empty fields'});
    
});

//Delete a Pokemon from an ID
pokemon.delete("/:id([0-9]{1,3})",async(req,res,next)=>{
    const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;
    const rows= await db.query(query);

    if(rows.affectedRows==1){
        return res.status(200).json({code:200, message:'Pokemon Deleted Successfully '});
    }
    return res.status(404).json({code:404, message:'Pokemon Not Found!'});
});

//Update a pokemon
pokemon.put("/:id([0-9]{1,3})",async(req,res,next)=>{
    const {pok_name,pok_height,pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){

        let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height=${pok_height},`;
        query+=`pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id}`;

        //This will let us know what has changed
        const rows= await db.query(query);
        if(rows.affectedRows==1){
            //We receive the data from the post and we show it as JSON
            return res.status(200).json({code:200, message:'Pokemon Successfuly Updated'});
        }
        return res.status(500).json({code:500, message:'An error ocurred!'});
    }
    return res.status(500).json({code:500, message:'Empty Fields'});
});

//Update a single pokemon data
pokemon.patch("/:id([0-9]{1,3})",async(req,res,next)=>{
        if(req.body.pok_name){
            let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id}`;

            //This will let us know what has changed
            const rows= await db.query(query);
            if(rows.affectedRows==1){
                //We receive the data from the post and we show it as JSON
                return res.status(200).json({code:200, message:'Pokemon Successfuly Updated'});
            }
            return res.status(500).json({code:500, message:'Something went wrong'});
        }
        return res.status(500).json({code:500, message:'Empty fields'});
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
        return res.status(200).json({code:200,message:pkmn});
    }
    return res.status(404).send({code:404, message:'Pokemon not found'});
});

//Route to find pokemon by their names. Making sure it only accpets letters with REGEX
pokemon.get('/:name([A-Za-z]+)',async(req,res,next)=>{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+ name+"';");
    if(pkmn.length>0){
        return res.status(200).json({code:200,message:pkmn});
    }
    return res.status(404).send({code:404, message:'Pokemon not found'});

});

module.exports=pokemon;