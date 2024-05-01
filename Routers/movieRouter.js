const express= require ("express")

const authMiddleware= require('../Middleware/authentication')
const router= express.Router()

const{ addMovie, getAllMovies, getOneMovie, updateMovie, deleteMovie }=require ('../Controllers/movieController')

router.post('/addMovie', authMiddleware, addMovie)
router.get('/getAll', getAllMovies)
router.get('/getOneMovie/:id', getOneMovie)
router.put('/updateMovie/:id',authMiddleware,updateMovie)
router.delete('/deleteMovie/:id',authMiddleware, deleteMovie)

module.exports=router