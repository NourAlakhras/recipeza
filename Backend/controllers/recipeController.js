// Backend\controllers\recipeController.js
const Recipe = require('../models/recipe');
const User = require('../models/user'); 

// Create a new recipe and update user document
const createRecipe = async (recipeData, userId) => {
    try {
        // Create a new recipe
        const newRecipe = await Recipe.create({
            name: recipeData.name,
            instructions: recipeData.instructions,
            ingredients: recipeData.ingredients,
            imageUrls: recipeData.imageUrls,
        });

        // Update user document with the new recipe's ID
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { addedRecipes: newRecipe._id } },
            { new: true }
        );

        return newRecipe;
    } catch (error) {
        console.error('Error in createRecipe:', error);
        throw error;
    }
};


const saveRecipe = async (userId, recipeId) => {
    try {
        // Check if the user already has the recipe saved
        const user = await User.findById(userId);
        if (user.savedRecipes.includes(recipeId)) {
            throw new Error('Recipe already saved by the user.');
        }

        // Save the recipe ID to the user's savedRecipes array
        await User.findByIdAndUpdate(userId, { $push: { savedRecipes: recipeId } });

        return { message: 'Recipe saved successfully.' };
    } catch (error) {
        console.error('Error in saveRecipe:', error);
        throw error;
    }
};


// Get all recipes
const getAllRecipes = async () => {
    try {
        const recipes = await Recipe.find();
        return recipes;
    } catch (error) {
        console.error('Error in getAllRecipes:', error);
        throw error;
    }
};

// Search recipes by a keyword
const searchRecipes = async (keyword) => {
    try {
        const recipes = await Recipe.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in the name
                { instructions: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in the instructions
                { 'ingredients.name': { $regex: keyword, $options: 'i' } }, // Case-insensitive search in ingredient names
            ],
        });
        return recipes;
    } catch (error) {
        console.error('Error in searchRecipes:', error);
        throw error;
    }
};

// Update a recipe by ID
const updateRecipeById = async (recipeId, updatedData) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedData, { new: true });
        return updatedRecipe;
    } catch (error) {
        console.error('Error in updateRecipeById:', error);
        throw error;
    }
};

// Delete a recipe by ID
const deleteRecipeById = async (recipeId) => {
    try {
        // Find the recipe to be deleted
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            // If the recipe was not found, handle accordingly (e.g., return an error or appropriate response)
            return null;
        }

        // Remove the recipe ID from users who added it
        await User.updateMany(
            { addedRecipes: recipeId },
            { $pull: { addedRecipes: recipeId } }
        );

        // Remove the recipe ID from users who saved it
        await User.updateMany(
            { savedRecipes: recipeId },
            { $pull: { savedRecipes: recipeId } }
        );

        return deletedRecipe;
    } catch (error) {
        console.error('Error in deleteRecipeById:', error);
        throw error;
    }
};

// Get all recipes added by a user
const getAddedRecipesByUser = async (userId) => {
    try {
        const user = await User.findById(userId).populate({
            path: 'addedRecipes',
            model: 'Recipe', // Assuming the model name is 'Recipe'
        });

        if (!user) {
            // If the user is not found, handle accordingly (e.g., return an error or appropriate response)
            return null;
        }

        return user.addedRecipes;
    } catch (error) {
        console.error('Error in getAddedRecipesByUser:', error);
        throw error;
    }
};

// Get all recipes added by a user
const getSavedRecipesByUser = async (userId) => {
    try {
        const user = await User.findById(userId).populate({
            path: 'savedRecipes',
            model: 'Recipe', // Assuming the model name is 'Recipe'
        });
        
        if (!user) {
            // If the user is not found, handle accordingly (e.g., return an error or appropriate response)
            return null;
        }

        return user.savedRecipes;
    } catch (error) {
        console.error('Error in getAddedRecipesByUser:', error);
        throw error;
    }
};



module.exports = {
    createRecipe,
    getAllRecipes,
    searchRecipes,
    updateRecipeById,
    deleteRecipeById,
    saveRecipe,
    getAddedRecipesByUser,
    getSavedRecipesByUser
};
