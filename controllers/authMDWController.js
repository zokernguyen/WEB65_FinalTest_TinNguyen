import jwt from "jsonwebtoken";

const authMDWController = {

    //Verify access token MDW

    verifyToken: (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization header is missing. Please login to get access.'
            });
        }

        //extract access token from req.header
        const accessToken = authHeader.split(' ')[1];

        if (!accessToken) {
            return res.status(401).json({
                message: 'No authorization token provided'
            });
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            //get method err and token decoded payload as params to handle err, then assign the token payload to req obj to use in the next step.
            if (err) {
                if (err.name = 'TokenExpiredError') {
                    return res.status(401).json({
                        message: 'Access token has expired, please login again.',
                    });
                } else {
                    return res.status(401).json({ error: "Invalid access token" });
                }
            }
            req.user = user;
            next();
        });
    },
}

export default authMDWController;