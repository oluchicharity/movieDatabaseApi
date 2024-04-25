const express= require ("express")

const router= express.Router()

const{ createUser, Login, getOneUser, getAllUsers, deleteUser }=require ('../Controllers/userController')

router.post('/createUser', createUser)

router.post('/login', Login)

router.get('/getOne/:id', getOneUser)

router.get('/getAllUsers', getAllUsers)

router.delete('/delete/:id', deleteUser )

module.exports=router