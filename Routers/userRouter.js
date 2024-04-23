const express= require ("express")

const router= express.Router()

const{ createUser, Login }=require ('../Controllers/userController')

router.post('/createUser', createUser)

router.post('/login', Login)

module.exports=router