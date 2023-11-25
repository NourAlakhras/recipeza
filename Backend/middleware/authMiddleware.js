const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized. Token not provided." });
        }

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized. Invalid token." });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Error in authenticateUser middleware:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};


module.exports = authenticateUser;




