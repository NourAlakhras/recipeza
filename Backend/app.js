const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./db");
const morgan = require("morgan");
const bodyParser = require("body-parser");//Parses incoming request bodies.
const compression = require("compression");//Compresses the response data.
const cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express();
const { PORT } = process.env;

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(helmet()); // Helmet helps secure your Express apps by setting various HTTP headers
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(morgan("combined")); // Use a predefined log format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());


// Connect to the database
connectDB();




// Use  routers
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userProfileRoutes');
const authRoutes = require('./routes/authRoutes');
app.use(cookieParser());


app.use('/recipes', recipeRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);


// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
