const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authenticateUser = require('../middleware/authMiddleware');

// Route to update user profile (excluding email) with an optional image upload
router.put('/user-profile/:id', authenticateUser, async (req, res) => {
    try {
        const userId = req.params.id;
        const { profilePicture, ...otherData } = req.body;

        let updatedUser;

        // Check if a new profile picture is included in the request
        if (profilePicture) {
            updatedUser = await userProfileController.updateUserProfileWithPicture(userId, profilePicture, otherData);
        } else {
            // If there's no new profile picture, update other data only
            updatedUser = await userProfileController.updateUserProfile(userId, { ...otherData });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error in updating user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
