const express= require ('express')
const movieModel= require('../Models/movieModel')


exports.addMovie =async (req,res)=>{

    try {
        const {title, releaseDate,genre,cast}= req.body

        if(!title || !releaseDate || !genre ||!cast){
            res.status(400).json('fields are required')
        }

        // Get the user ID from the authenticated request
        const addedBy = req.user.userId;

        const newMovie= new movieModel({

            title,
            releaseDate,
            genre,
            cast,
            addedBy

        })
        
        savedMovie= await newMovie.save()

        res.status(200).json(savedMovie)

    } catch (error) {
        console.error('Error adding this movie:', error.message);
        res.status(500).json(error.message);   
    }
}


