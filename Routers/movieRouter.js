const express= require ("express")

const authMiddleware= require('../Middleware/authentication')
const router= express.Router()

const{ addMovie, getAllMovies, getOneMovie }=require ('../Controllers/movieController')

router.post('/addMovie', authMiddleware, addMovie)
router.get('/getAll', getAllMovies)
router.get('/getOneMovie/:id', getOneMovie)


module.exports=router