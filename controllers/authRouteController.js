import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { users } from '../configs/db.js';

config();

const authRouteController = {

    //Generate access token
    genAccessToken: (user) => {
        const payload = {
            username: user.username,
        };

        return jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
    },

    //Login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            console.log(username, password);
            //check input
            if (!username || !password) {
                return res.status(400).json({ message: 'Username or password is empty' });
            };

            // Check if user is existed in DB or not
            const user = await users.findOne({
                username: username,
            });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Check if password matched with username
            const isValidPW = await users.findOne({
                username: username,
                password: password,
            });

            if (!isValidPW) {
                return res.status(400).json({ message: 'Incorrect password' });
            };

            // If password is valid, proceed with authentication

            if (user && isValidPW) {

                const accessToken = authRouteController.genAccessToken(user);

                const { password, ...othersInfo } = user;
                //exclude sensitive data from user's document before sending it in response.

                res.status(200).json({ ...othersInfo, accessToken, });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

export default authRouteController;