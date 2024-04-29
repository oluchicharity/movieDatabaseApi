const jwt = require("jsonwebtoken");
const userModel = require('../Models/userModel');
const movieModel = require('../Models/movieModel');
require("dotenv").config();


const authMiddleware = async (req, res, next) => {
    try {
        // Extract the JWT token from the Authorization header
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        const token = authorizationHeader.split(' ')[1];

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.SECRET, { expiresIn: '5d' });
        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Fetch user from database based on the decoded token
        const user = await userModel.findById(decodedToken.userId);
        // console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'User  cannot be found' });
        }

        // Populate req.user with the authenticated user's information
        req.user = user;
        // console.log(req.user)

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(500).json(error.message);
    }
};

module.exports= authMiddleware
