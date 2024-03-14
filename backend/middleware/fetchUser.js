var jwt = require('jsonwebtoken');
const JWT_KEY = "neerajmodi";


const fetchUser = (req, res, next) => {
    // Get user from the jwt token and add it to req object
    const token = req.header("authToken");
    if (!token) {
        res.status(401).send({ error: "Please use the valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please use the valid token" })
    }
}

module.exports = fetchUser;