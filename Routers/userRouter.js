const express= require ("express")

const router= express.Router()

const{ createUser, Login, getOneUser, getAllUsers }=require ('../Controllers/userController')

router.post('/createUser', createUser)

router.post('/login', Login)

router.get('/getOne/:id', getOneUser)

router.get('/getAllUsers', getAllUsers)

module.exports=router