// Backend\controllers\userProfileController.js
const User = require('../models/user');

const updateUserProfile = async (userId, updatedProfile) => {
    try {
        // Prevent updating the email
        const { email, ...otherData } = updatedProfile;

        const updatedUser = await User.findByIdAndUpdate(userId, otherData, { new: true });
        return updatedUser;
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        throw error;
    }
};

const updateUserProfileWithPicture = async (userId, profilePicture, otherData) => {
    try {
        // Prevent updating the email
        const { email, ...remainingData } = otherData;

        // Assuming profilePicture is a Buffer and contentType is a String
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: { data: profilePicture, contentType: 'image/jpeg' }, ...remainingData },
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        console.error('Error in updateUserProfileWithPicture:', error);
        throw error;
    }
};

module.exports = {
    updateUserProfile,
    updateUserProfileWithPicture,
};
