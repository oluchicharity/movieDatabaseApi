const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel');
const Emails= require('../Email')
const jwt= require('jsonwebtoken')

      exports.createUser = async (req, res) => {
    try {
        const { Fullname, Email, Password } = req.body;

        // Check if required fields are provided
        if (!Fullname || !Email || !Password) {
            return res.status(400).json({ error: 'Fullname, Email, and Password are required for registration' });
        }

        // Check if email already exists
        const existingUser = await userModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ error: 'This email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(Password, salt);

        // Create a new user
        const newUser = new userModel({
            Fullname,
            Email,
            Password: hashedPassword
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with the saved user object
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json(error.message);
    }
};


exports.Login = async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      if (!Email || !Password) {
        return res.status(400).json({ error: 'Email and Password are required' });
      }
  
      const user = await userModel.findOne({ Email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(Password, user.Password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwt.sign(
        { userId: user._id, Email: user.Email },
        process.env.SECRET,
        { expiresIn: '5d' }
      );
  
      await Emails({
        email: user.Email,
        subject: 'Successful Login',
        html: '<p>You have successfully logged into movie Api.</p>',
      });
  
      res.json({
        message: 'Welcome',
        user: { Email: user.Email, Fullname: user.Fullname },
        token
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json(error.message);
    }
  };
  
 

  exports.getOneUser = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Find the user by ID in the database using findById
      const user = await userModel.findById(id);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return the user as JSON response
      res.json(user);
    } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).json(error.message);
    }
  };
  

  exports. getAllUsers= async (req,res)=>{

    try {
        
        const users= await userModel.find()

      if(!users){
        return res.status(404).json('No users found')
      }

      return res.json(users)
    } catch (error) {
        console.error('Error finding users:', error);
      res.status(500).json(error.message);
    }
  }

  exports.deleteUser= async (req,res)=>{
    try {
        const userId= req.params.id

        const user= await userModel.findByIdAndDelete(userId)
        
        if(!user){
            return res.status(404).json(`User to be deleted does not exist`)
        }

        return res.json('This user has been deleted successfully')
    } catch (error) {
        console.error('Error:', error);
      res.status(500).json(error.message);
    }
  }

exports.updateUser= async (req,res)=>{
    try {
        const userId= req.params.id

        const updateData= req.body

        const updatedUser= await userModel.findByIdAndUpdate(userId, updateData, {new:true})

        if(!updatedUser){
            return res.json(404).json('user to be updated not found')
        }

        await Emails({
            email: updatedUser.Email,
            subject: 'You just updated your profile',
            html: '<p>an update has taken place on your profile, please notify us if this wasnt from you</p>',
          });

        return res.json(updatedUser)
    } catch (error) {
        console.error('Error:', error);
      res.status(500).json(error.message);
    }
}