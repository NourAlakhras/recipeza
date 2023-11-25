const express = require('express');
const authenticateUser = require('../middleware/authMiddleware');
const recipeController = require('../controllers/recipeController');
const router = express.Router();


// Route to create a new recipe
router.post('/', authenticateUser, async (req, res) => {
    try {
        const recipeData = req.body;
        const userId = req.user._id; // Assuming the user ID is available in the request after authentication
        const newRecipe = await recipeController.createRecipe(recipeData, userId);
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error in creating a recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to save a recipe
router.post('/saveRecipe/:recipeId', authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const recipeId = req.params.recipeId;

        const result = await recipeController.saveRecipe(userId, recipeId);

        res.json(result);
    } catch (error) {
        console.error('Error in saving recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await recipeController.getAllRecipes();
        res.json(recipes);
    } catch (error) {
        console.error('Error in getting all recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to search recipes by keyword
router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const recipes = await recipeController.searchRecipes(keyword);
        res.json(recipes);
    } catch (error) {
        console.error('Error in searching recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route to get a recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeController.getRecipeById(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        console.error('Error in getting a recipe by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update a recipe by ID
router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const recipeId = req.params.id;
        const updatedData = req.body;
        const updatedRecipe = await recipeController.updateRecipeById(recipeId, updatedData);
        res.json(updatedRecipe);
    } catch (error) {
        console.error('Error in updating a recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a recipe by ID
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await recipeController.deleteRecipeById(recipeId);
        res.json(deletedRecipe);
    } catch (error) {
        console.error('Error in deleting a recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route to get all recipes added by a user
router.get('/user/added', authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id
        const addedRecipes = await recipeController.getAddedRecipesByUser(userId);

        if (!addedRecipes) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(addedRecipes);
    } catch (error) {
        console.error('Error in getting added recipes by user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all recipes added by a user
router.get('/user/saved', authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id
        const savedRecipes = await recipeController.getSavedRecipesByUser(userId);

        if (!savedRecipes) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(savedRecipes);
    } catch (error) {
        console.error('Error in getting added recipes by user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

