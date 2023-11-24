const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization;

        console.log('Received token:', token);

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.userId);
        console.log('User:', user);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authenticateUser middleware:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};


module.exports = authenticateUser;
