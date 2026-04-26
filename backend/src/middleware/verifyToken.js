import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Get token from cookies or headers
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId; // Save the user ID for later use
        next(); // Move to the next function (the Controller)
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};