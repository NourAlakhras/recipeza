// Backend\models\recipe.js
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true, // Remove leading and trailing whitespaces
    },
    instructions: {
        type: String,
        trim: true,
    },
    ingredients: [{
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, min: 0 },
        unit: { type: String, trim: true },
    }],
    image: [{
        data: { type: String, required: true }, // assuming you store base64-encoded image data as a string
        contentType: { type: String, required: true },
    }],
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
