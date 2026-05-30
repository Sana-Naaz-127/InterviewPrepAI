const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        // Get authorization header

        const authHeader = req.header("Authorization");

        if(!authHeader){

            return res.status(401).json({
                message: "No token, authorization denied"
            });

        }

        // Extract token from Bearer TOKEN

        const token = authHeader.split(" ")[1];

        // Verify token

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user info

        req.user = decoded;

        next();

    } catch(error){

        console.log(error);

        res.status(401).json({
            message: "Token is not valid"
        });

    }

};

module.exports = authMiddleware;