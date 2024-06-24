const validateSession = (req, res, next) => {
    req.session.signupData = req.session.signupData || {};
    next();
};

module.exports = validateSession;
