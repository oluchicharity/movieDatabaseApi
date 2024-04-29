const express= require ("express")

const authMiddleware= require('../Middleware/authentication')
const router= express.Router()

const{ addMovie }=require ('../Controllers/movieController')

router.post('/addMovie', authMiddleware, addMovie)


module.exports=router