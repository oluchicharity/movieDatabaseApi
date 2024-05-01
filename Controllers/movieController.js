const express= require ('express')
const movieModel= require('../Models/movieModel')
const Emails= require('../Email')
const userModel= require('../Models/userModel')

exports.addMovie =async (req,res)=>{

    try {
        const {title, releaseDate,genre,cast}= req.body

        const addedBy = req.user.userId;

        if(!title || !releaseDate || !genre ||!cast ){
           return res.status(400).json('fields missing')
        }
        
        const newMovie= new movieModel({

            title,
            releaseDate,
            genre,
            cast,
            addedBy

        })
        
        savedMovie= await newMovie.save()

       return  res.status(200).json(savedMovie)

    } catch (error) {
        console.error('Error adding this movie:', error.message);
       return res.status(500).json(error.message);   
    }
}


exports.getAllMovies= async (req,res)=>{
    try {

    const Movies= await movieModel.find()

    if(!Movies){
       return res.status(404).json('there are no movies available')
    }

   return res.status(200).json(Movies)
        
    } catch (error) {
        console.error('Error getting movies', error.message);
       return res.status(500).json(error.message);   
    }
}


exports.getOneMovie= async (req,res)=>{
    try {
        const id= req.params.id
        const movie= await movieModel.findById(id)
        if(!movie){
           return res.status(404).json('this movie is not yet available')
        }

       return res.status(200).json(movie)
    } catch (error) {
        console.error('cannot get this movie', error.message);
       return res.status(500).json(error.message);   
    }
}


exports.updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const updateData = req.body;

        const updatedMovie = await movieModel.findByIdAndUpdate(movieId, updateData, { new: true });

        if (!updatedMovie) {
            return res.status(404).json('Movie to be updated not found');
        }

        const user = await userModel.findById(req.user.userId); 
        if (!user || !user.Email) {
            return res.status(400).json('User email not found');
        }

        await Emails({
            email: user.Email, 
            subject: 'Your movie has been updated',
            html: '<p>You have updated a movie.</p>',
        });

        return res.status(200).json(updatedMovie);
    } catch (error) {
        console.error('Cannot update this movie:', error.message);
        return res.status(500).json(error.message);
    }
};

exports.deleteMovie= async (req,res)=>{
    try {
        const movieId= req.params.id
        const movie = await movieModel.findByIdAndDelete(movieId)
        
        if(!movie){
            return res.status(404).json('this movie does not exist')
        }

        return res.status(200).json('Deleted Sucessfully')
        
    } catch (error) {
        console.error('Cannot delete this movie:', error.message);
        return res.status(500).json(error.message); 
    }
}
