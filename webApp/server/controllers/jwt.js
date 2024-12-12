const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({ message: "token not found" });
    }

    const token = authHeader.split(" ")[1];

    if(!token) return res.status(401).json({ message: "Unauthorized" });
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

const generateToken = (userData) => {
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    return token;
};

module.exports = { jwtAuthMiddleware, generateToken };