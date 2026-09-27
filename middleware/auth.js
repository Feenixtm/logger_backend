import "dotenv/config";
import jwt from "jsonwebtoken";

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader && authHeader.split(" ")[1];

        if (accessToken === null) {
            res.status(401).json({ message: "No access token provided." });
            return;
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN, (error, decodedPayload) => {
            if (error) {
                res.status(401).json({ message: "Invalid access token." });
                return;
            }

            req.user = decodedPayload;
            next();
        })
        
    } catch (error) {
        res.json({ message: "Error verifying token!", error });
    }
}

export { authenticateToken };