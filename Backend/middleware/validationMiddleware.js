const handlePasswordValidation = (error, doc, next) => {
    if (error.errors && error.errors.password) {
        console.error('Password validation failed:', error.errors.password.message);
        // You can choose to log, send a custom response, etc.
    }

    next();
};

module.exports = {
    handlePasswordValidation,
};