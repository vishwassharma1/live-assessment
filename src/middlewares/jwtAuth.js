const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');



const jwtAuth = () => (req, res, next) => {
    const token = req.cookies.token; // Get token from HTTP-only cookies

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token,"YrJgpFZDKj7hwHsNIxLVU0Q9bVijrUF2");
        req.user = decoded.user;
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error('JWTAuthError:', err);
        throw new 'Token is not valid'
    }
};

module.exports = { jwtAuth };
