const jwt = require("jsonwebtoken");
const userModel = require('../Models/userModel');
const movieModel = require('../Models/movieModel');
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET); 
        const user = await userModel .findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = { userId: user.id }; 

        next(); 
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = authMiddleware;
