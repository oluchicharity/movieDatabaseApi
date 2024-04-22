const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel');

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
